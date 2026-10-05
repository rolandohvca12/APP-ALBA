cmake_minimum_required(VERSION 3.20)
project(OpenSeesPortableUmfpack LANGUAGES C)
set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")

if(NOT DEFINED OPEN_SEES_SOURCE_DIR)
  message(FATAL_ERROR "OPEN_SEES_SOURCE_DIR is required")
endif()

add_subdirectory("${OPEN_SEES_SOURCE_DIR}/OTHER/AMD" amd)
add_subdirectory("${OPEN_SEES_SOURCE_DIR}/OTHER/UMFPACK" umfpack)
