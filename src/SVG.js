import React from "react";

export const SVG = {
    Send({ w, h }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={w}
                height={h}
                fill="currentColor"
                className="bi bi-send"
                color="#00f"
                viewBox="0 0 16 16"
            >
                <path
                    fill="#00f"
                    d="M15.854.146a.5.5 0 01.11.54l-5.819 14.547a.75.75 0 01-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 01.124-1.33L15.314.037a.5.5 0 01.54.11zM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493z"
                ></path>
            </svg>
        );
    },

    Search({ w, h }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={w}
                height={h}
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
            >
                <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"></path>
            </svg>
        );
    },

    Plus({ w, h }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={w}
                height={h}
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
            >
                <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z"></path>
            </svg>
        );
    },

    Menu({ w, h }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={w}
                height={h}
                viewBox="0 0 21 21"
            >
                <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4.5 6.5h12M4.498 10.5h11.997M4.5 14.5h11.995"></path>
                </g>
            </svg>
        );
    },
    User() {
        return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="#fff"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#fff"
                d="M288 320a224 224 0 10448 0 224 224 0 10-448 0zm544 608H160a32 32 0 01-32-32v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 01-32 32z"
              ></path>
            </svg>
          );
    },

    Lock() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="32"
            // height="32"
            fill="currentColor"
            className="bi bi-lock-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 012 2v4H6V3a2 2 0 012-2zm3 6V3a3 3 0 00-6 0v4a2 2 0 00-2 2v5a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2z"></path>
          </svg>
        );
      },
}