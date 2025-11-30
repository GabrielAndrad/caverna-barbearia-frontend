import React from 'react'
import neve from '../../assets/neve.png'

const Snowflakes: React.FC = () => {
  const snowflakes = React.useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.8 + 0.9,
        width: `${Math.random() * 15 + 8}px`
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
          }}
        >
          <img style={{width:flake.width}} src={neve} alt="snowflake" />
        </div>
      ))}
    </div>
  )
}

export default React.memo(Snowflakes)
