import React from "react";
import styles from "./AvatarComponent.module.scss";

function AvatarComponent({ fullName, isActive=false, size=60 }) {
  function getInitials(name) {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("")
      .slice(0, 2);
  }

  return (
    <div    className={isActive ? `${styles.avatarWrapper} ${styles.active}` : styles.avatarWrapper} 
            style={{ width: `${size}px`, height: `${size}px`, "--avatar-size": `${size}px`}}
    >
      <svg className={styles.staticCircle + " " + styles.circle} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" />
      </svg>

      <svg className={styles.animatedCircle + " " + styles.circle} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" />
      </svg>

      <p className={styles.fullName}>{getInitials(fullName)}</p>
    </div>
  );
}

export default AvatarComponent;