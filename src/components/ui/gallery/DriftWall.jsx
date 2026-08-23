import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./DriftWall.css";

const DEFAULT_ITEMS = Array.from({ length: 15 }, (_, index) => {
  const ids = [
    1015,
    1025,
    1039,
    1043,
    1044,
    1050,
    1062,
    1069,
    1074,
    1080,
    1084,
    106,
    110,
    133,
    164,
  ];

  return {
    image: `https://picsum.photos/id/${ids[index % ids.length]}/600/400`,
    title: `Tile ${index + 1}`,
    href: undefined,
  };
});

const prefersReducedMotion = () => {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;

  return 1 + variance * pseudo;
};

const DriftWall = ({
  items = DEFAULT_ITEMS,

  // Layout
  columns = 3,
  tileWidth = 380,
  tileHeight = 250,
  gap = 28,
  radius = 14,

  // Animation
  speed = 38,
  direction = "up",
  variance = 0.25,

  // Interaction
  pauseOnHover = false,
  lift = 1.025,

  // Appearance
  fade = 0.6,
  dim = 0.25,
  grayscale = false,
  overlayColor = "#0a0a0a",

  className = "",
  style,
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);

  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);

  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState(null);
  const activeIdRef = useRef(null);

  const [reduced, setReduced] = useState(false);

  /*
   * ------------------------------------------------------------
   * Reduced motion
   * ------------------------------------------------------------
   */

  useEffect(() => {
    setReduced(prefersReducedMotion());

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleChange = (event) => {
      setReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * Split items into columns
   * ------------------------------------------------------------
   */

  const columnItems = useMemo(() => {
    const cols = Array.from(
      { length: columns },
      () => []
    );

    items.forEach((item, index) => {
      cols[index % columns].push(item);
    });

    return cols.map((column) =>
      column.length ? column : items.slice(0, 1)
    );
  }, [items, columns]);

  /*
   * ------------------------------------------------------------
   * Calculate column dimensions
   * ------------------------------------------------------------
   */

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;

    return columnItems.map((column) => {
      const copyHeight = Math.max(
        unit,
        column.length * unit
      );

      const copies = Math.max(
        2,
        Math.ceil(
          (containerHeight * 1.6) / copyHeight
        ) + 1
      );

      return {
        copyHeight,
        copies,
      };
    });
  }, [
    columnItems,
    tileHeight,
    gap,
    containerHeight,
  ]);

  /*
   * ------------------------------------------------------------
   * Observe container height
   * ------------------------------------------------------------
   */

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(
      ([entry]) => {
        setContainerHeight(
          entry.contentRect.height || 600
        );
      }
    );

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * Base velocity for each column
   *
   * Column 1 → up
   * Column 2 → down
   * Column 3 → up
   * ------------------------------------------------------------
   */

  const baseVelocities = useMemo(() => {
    const directionSign =
      direction === "up" ? 1 : -1;

    return columnItems.map(
      (_, columnIndex) => {
        const alternatingSign =
          columnIndex % 2 === 0 ? 1 : -1;

        return (
          speed *
          columnFactor(
            columnIndex,
            variance
          ) *
          directionSign *
          alternatingSign
        );
      }
    );
  }, [
    columnItems,
    speed,
    direction,
    variance,
  ]);

  /*
   * ------------------------------------------------------------
   * Reset column positions
   * ------------------------------------------------------------
   */

  useEffect(() => {
    offsetsRef.current = columnMeta.map(
      (meta, columnIndex) =>
        meta.copyHeight *
        ((columnIndex * 0.37) % 1)
    );

    velocitiesRef.current =
      columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  /*
   * ------------------------------------------------------------
   * Keep the wall completely flat
   *
   * IMPORTANT:
   *
   * No rotateX
   * No rotateY
   * No rotateZ
   * No translateZ
   * No mouse parallax
   * No perspective
   * ------------------------------------------------------------
   */

  const applyPlaneTransform = useCallback(() => {
    const plane = planeRef.current;

    if (!plane) {
      return;
    }

    plane.style.transform =
      "translate(-50%, -50%)";
  }, []);

  /*
   * ------------------------------------------------------------
   * Animation loop
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const animate = (timestamp) => {
      if (lastTsRef.current === null) {
        lastTsRef.current = timestamp;
      }

      const deltaTime = Math.min(
        0.05,
        Math.max(
          0,
          timestamp - lastTsRef.current
        ) / 1000
      );

      lastTsRef.current = timestamp;

      /*
       * Keep the wall flat.
       */
      applyPlaneTransform();

      /*
       * --------------------------------------------------------
       * Animate each column
       * --------------------------------------------------------
       */

      if (!reduced) {
        for (
          let columnIndex = 0;
          columnIndex <
          trackRefs.current.length;
          columnIndex++
        ) {
          const meta =
            columnMeta[columnIndex];

          if (!meta) {
            continue;
          }

          const paused =
            wallHoveredRef.current &&
            pauseOnHover;

          const factor =
            paused ||
            hoveredColRef.current ===
              columnIndex
              ? 0
              : 1;

          const target =
            baseVelocities[columnIndex] *
            factor;

          const easing =
            1 -
            Math.exp(
              -deltaTime /
                (target === 0
                  ? 0.16
                  : 0.28)
            );

          velocitiesRef.current[
            columnIndex
          ] +=
            (target -
              velocitiesRef.current[
                columnIndex
              ]) *
            easing;

          let next =
            (offsetsRef.current[
              columnIndex
            ] ?? 0) +
            velocitiesRef.current[
              columnIndex
            ] *
              deltaTime;

          /*
           * Infinite loop.
           */
          next =
            ((next % meta.copyHeight) +
              meta.copyHeight) %
            meta.copyHeight;

          offsetsRef.current[
            columnIndex
          ] = next;

          const track =
            trackRefs.current[
              columnIndex
            ];

          if (track) {
            track.style.transform =
              `translate3d(0, ${-next}px, 0)`;
          }
        }
      } else {
        /*
         * Reduced motion mode.
         */
        for (
          let columnIndex = 0;
          columnIndex <
          trackRefs.current.length;
          columnIndex++
        ) {
          const track =
            trackRefs.current[
              columnIndex
            ];

          if (track) {
            track.style.transform =
              `translate3d(0, ${
                -(
                  offsetsRef.current[
                    columnIndex
                  ] ?? 0
                )
              }px, 0)`;
          }
        }
      }

      rafRef.current =
        requestAnimationFrame(animate);
    };

    rafRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }

      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [
    applyPlaneTransform,
    baseVelocities,
    columnMeta,
    pauseOnHover,
    reduced,
  ]);

  /*
   * ------------------------------------------------------------
   * Activate tile
   * ------------------------------------------------------------
   */

  const activate = useCallback(
    (id, columnIndex) => {
      activeIdRef.current = id;

      hoveredColRef.current =
        columnIndex;

      setActiveId(id);
    },
    []
  );

  /*
   * ------------------------------------------------------------
   * Release tile
   * ------------------------------------------------------------
   */

  const release = useCallback(() => {
    activeIdRef.current = null;

    hoveredColRef.current = -1;

    setActiveId(null);
  }, []);

  /*
   * ------------------------------------------------------------
   * Pointer movement
   *
   * Only detects the active certificate.
   * There is NO parallax.
   * ------------------------------------------------------------
   */

  const handlePointerMove = useCallback(
    (event) => {
      const tile =
        event.target?.closest?.(
          "[data-tile-id]"
        );

      if (!tile) {
        return;
      }

      const id =
        tile.dataset.tileId;

      if (
        id === activeIdRef.current
      ) {
        return;
      }

      activeIdRef.current = id;

      hoveredColRef.current =
        Number(tile.dataset.col);

      setActiveId(id);
    },
    []
  );

  /*
   * ------------------------------------------------------------
   * Pointer enters wall
   * ------------------------------------------------------------
   */

  const handlePointerEnterWall =
    useCallback(() => {
      wallHoveredRef.current = true;
    }, []);

  /*
   * ------------------------------------------------------------
   * Pointer leaves wall
   * ------------------------------------------------------------
   */

  const handlePointerLeaveWall =
    useCallback(() => {
      wallHoveredRef.current = false;

      release();
    }, [release]);

  /*
   * ------------------------------------------------------------
   * CSS variables
   * ------------------------------------------------------------
   */

  const cssVars = useMemo(
    () => ({
      "--dw-tile-w": `${tileWidth}px`,
      "--dw-tile-h": `${tileHeight}px`,
      "--dw-gap": `${gap}px`,
      "--dw-radius": `${radius}px`,

      "--dw-lift": lift,
      "--dw-dim": dim,

      "--dw-gray": grayscale
        ? 1
        : 0,

      "--dw-overlay":
        overlayColor,

      "--dw-edge": `${Math.max(
        0,
        (1 - fade) * 100
      )}%`,

      ...style,
    }),
    [
      tileWidth,
      tileHeight,
      gap,
      radius,
      lift,
      dim,
      grayscale,
      overlayColor,
      fade,
      style,
    ]
  );

  /*
   * ------------------------------------------------------------
   * Render certificate tile
   * ------------------------------------------------------------
   */

  const renderTile = (
    item,
    id,
    columnIndex
  ) => {
    const inner = (
      <span className="drift-wall__inner">
        <img
          src={item.image}
          alt={item.title ?? ""}
          loading="lazy"
          decoding="async"
          draggable={false}
        />

        <span
          className="drift-wall__overlay"
          aria-hidden="true"
        />
      </span>
    );

    const commonProps = {
      className:
        `drift-wall__tile${
          activeId === id
            ? " is-active"
            : ""
        }`,

      "data-tile-id": id,

      "data-col": columnIndex,

      onFocus: () =>
        activate(
          id,
          columnIndex
        ),

      onBlur: release,
    };

    /*
     * Only create a link when a real
     * credential URL exists.
     */
    if (
      item.href &&
      item.href !== "#"
    ) {
      return (
        <a
          key={id}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          {...commonProps}
        >
          {inner}
        </a>
      );
    }

    /*
     * Otherwise use a focusable div.
     */
    return (
      <div
        key={id}
        tabIndex={0}
        role="button"
        aria-label={
          item.title ??
          "Certificate"
        }
        {...commonProps}
      >
        {inner}
      </div>
    );
  };

  /*
   * ------------------------------------------------------------
   * Root class
   * ------------------------------------------------------------
   */

  const rootClass = [
    "drift-wall",
    reduced
      ? "drift-wall--reduced"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /*
   * ------------------------------------------------------------
   * Render
   * ------------------------------------------------------------
   */

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={
        handlePointerMove
      }
      onPointerEnter={
        handlePointerEnterWall
      }
      onPointerLeave={
        handlePointerLeaveWall
      }
      role="group"
      aria-label="Drifting wall of certificates"
    >
      <div
        ref={planeRef}
        className="drift-wall__plane"
      >
        {columnItems.map(
          (
            column,
            columnIndex
          ) => {
            const meta =
              columnMeta[
                columnIndex
              ];

            const copies =
              Array.from({
                length:
                  meta.copies,
              });

            return (
              <div
                className="drift-wall__col"
                key={`column-${columnIndex}`}
              >
                <div
                  className="drift-wall__track"
                  ref={(element) => {
                    trackRefs.current[
                      columnIndex
                    ] = element;
                  }}
                >
                  {copies.map(
                    (
                      _,
                      copyIndex
                    ) =>
                      column.map(
                        (
                          item,
                          itemIndex
                        ) =>
                          renderTile(
                            item,
                            `${columnIndex}-${copyIndex}-${itemIndex}`,
                            columnIndex
                          )
                      )
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default DriftWall;