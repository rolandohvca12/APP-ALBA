# Third-party notices

The Linux x64 native backend embeds OpenSees 3.8.0 and distributes the
non-system runtime libraries required by the addon. Corresponding license texts
are included in `licenses/`.

| Component | Purpose | Notice |
|---|---|---|
| OpenSees 3.8.0 | Structural analysis engine | `licenses/OpenSees-COPYRIGHT.txt` |
| Tcl 8.6 | Embedded command interpreter | `licenses/Tcl.txt` |
| OpenBLAS/LAPACK | Dense linear algebra | `licenses/OpenBLAS.txt`, `licenses/LAPACK.txt` |
| ARPACK-NG | Eigenvalue solver | `licenses/ARPACK-NG.txt` |
| SuiteSparse | Sparse ordering and solution | `licenses/AMD.txt`, `licenses/UMFPACK.txt` |
| zlib | Compression runtime | `licenses/zlib.txt` |
| GCC runtime | C++ and Fortran runtime | `licenses/GCC-Runtime.txt` |

For every dynamically bundled Linux library, the build also copies the exact
Debian package copyright notice into `licenses/`. `BUILD_INFO.json` records the
complete shared-library inventory shipped with the addon.

OpenSees is copyrighted by The Regents of the University of California. Its
license notice accompanies this binary redistribution. The package is not
affiliated with, endorsed by, or sponsored by OpenSees, PEER, or the University
of California.
