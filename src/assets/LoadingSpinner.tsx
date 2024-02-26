import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner({ height = 80 }: { height?: number }) {
  return (
    <div
      className={styles.loadingSpinner}
      style={{ width: `${height}px`, height: `${height}px` }}
    >
      <div
        className={styles.loadingSpinnerInner}
        style={{
          width: `${height * 0.8}px`,
          height: `${height * 0.8}px`,
          borderWidth: `${height * 0.1}px`
        }}
      />
    </div>
  )
}
