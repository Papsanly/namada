import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner({ size = 20 }: { size?: number }) {
  return (
    <div
      className={styles.loadingSpinner}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div
        className={styles.loadingSpinnerInner}
        style={{
          width: `${size * 0.8}px`,
          height: `${size * 0.8}px`,
          borderWidth: `${size * 0.1}px`
        }}
      />
    </div>
  )
}
