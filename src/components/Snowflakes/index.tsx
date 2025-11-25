import React from 'react'

const Snowflakes: React.FC = () => {
  const snowflakes = React.useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 8 + 8}s`,
        animationDelay: `${Math.random() * 8}s`,
        opacity: Math.random() * 0.6 + 0.4,
        fontSize: `${Math.random() * 10 + 10}px`
      })),
    []
  )

  return (
    <div className="snowflakes-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            opacity: flake.opacity,
            fontSize: flake.fontSize
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}

export default Snowflakes
