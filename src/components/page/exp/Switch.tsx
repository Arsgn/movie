import { FC, useState } from "react";
import styles from "./Switch.module.scss";

interface SwitchProps {
  first: string;
  second: string;
  onChange: (val: string) => void;
}

const SwitchExs: FC<SwitchProps> = ({ first, second, onChange }) => {
  const [selected, setSelected] = useState(first);

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange(val);
  };

  const getIcon = (val: string) => {
    if (val.toLowerCase() === "movie") return "🎬";
    if (val.toLowerCase() === "tv") return "📺";
    return "";
  };

  return (
    <div className={styles.switch}>
      <div
        className={styles.slider}
        style={{ left: selected === first ? "0%" : "50%" }}
      />
      <div
        className={`${styles.option} ${
          selected === first ? styles.activeOption : ""
        }`}
        onClick={() => handleSelect(first)}
      >
        {getIcon(first)} {first.toUpperCase()}
      </div>
      <div
        className={`${styles.option} ${
          selected === second ? styles.activeOption : ""
        }`}
        onClick={() => handleSelect(second)}
      >
        {getIcon(second)} {second.toUpperCase()}
      </div>
    </div>
  );
};

export default SwitchExs;
