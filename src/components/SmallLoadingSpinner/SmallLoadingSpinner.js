import styles from "./smallLoadingSpinner.module.css"

export const SmallLoadingSpinner = () => {
    return (
        <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}