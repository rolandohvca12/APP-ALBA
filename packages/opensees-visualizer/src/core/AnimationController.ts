export interface AnimationState {
  readonly playing: boolean;
  readonly progress: number;
  readonly speed: number;
  readonly loop: boolean;
}

export interface AnimationClock {
  now(): number;
  request(callback: (time: number) => void): number;
  cancel(id: number): void;
}

const browserClock: AnimationClock = {
  now: () => performance.now(),
  request: callback => requestAnimationFrame(callback),
  cancel: id => cancelAnimationFrame(id),
};

export class AnimationController {
  private requestId: number | undefined;
  private startedAt = 0;
  private startProgress = 0;
  private durationMs = 1000;
  private listener: ((state: AnimationState) => void) | undefined;
  private state: AnimationState = { playing: false, progress: 0, speed: 1, loop: true };

  public constructor(private readonly clock: AnimationClock = browserClock) {}

  configure(durationSeconds: number, listener: (state: AnimationState) => void): this {
    if (!(durationSeconds > 0) || !Number.isFinite(durationSeconds)) {
      throw new RangeError("Animation duration must be finite and greater than zero.");
    }
    this.durationMs = durationSeconds * 1000;
    this.listener = listener;
    this.emit();
    return this;
  }

  play(): this {
    if (this.state.playing) return this;
    this.startedAt = this.clock.now();
    this.startProgress = this.state.progress;
    this.state = { ...this.state, playing: true };
    this.requestId = this.clock.request(this.tick);
    this.emit();
    return this;
  }

  pause(): this {
    if (this.requestId !== undefined) this.clock.cancel(this.requestId);
    this.requestId = undefined;
    this.state = { ...this.state, playing: false };
    this.emit();
    return this;
  }

  seek(progress: number): this {
    this.state = { ...this.state, progress: clamp(progress) };
    this.startedAt = this.clock.now();
    this.startProgress = this.state.progress;
    this.emit();
    return this;
  }

  setSpeed(speed: number): this {
    if (!(speed > 0) || !Number.isFinite(speed)) {
      throw new RangeError("Animation speed must be finite and greater than zero.");
    }
    this.state = { ...this.state, speed };
    return this.seek(this.state.progress);
  }

  setLoop(loop: boolean): this {
    this.state = { ...this.state, loop };
    this.emit();
    return this;
  }

  snapshot(): AnimationState {
    return this.state;
  }

  dispose(): void {
    this.pause();
    this.listener = undefined;
  }

  private readonly tick = (now: number): void => {
    if (!this.state.playing) return;
    let progress = this.startProgress + (now - this.startedAt) * this.state.speed / this.durationMs;
    if (progress >= 1) {
      if (!this.state.loop) {
        this.state = { ...this.state, playing: false, progress: 1 };
        this.requestId = undefined;
        this.emit();
        return;
      }
      progress %= 1;
      this.startedAt = now;
      this.startProgress = progress;
    }
    this.state = { ...this.state, progress };
    this.emit();
    this.requestId = this.clock.request(this.tick);
  };

  private emit(): void {
    this.listener?.(this.state);
  }
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}
