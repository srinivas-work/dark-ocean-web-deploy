import styles from "./Bubble.module.css";

const Bubble: React.FC<
  { title: string; isSelected?: boolean } & React.HTMLProps<HTMLDivElement>
> = ({ title, isSelected, ...props }) => {
  return (
    <div
      className={`${styles.Bubble} ${
        isSelected ? styles.active : styles.inactive
      }`}
      {...props}
    >
      {title}
    </div>
  );
};

export default Bubble;
