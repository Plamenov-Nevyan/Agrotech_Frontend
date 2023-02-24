import styles from "./userPublStats.module.css"

export const UserPublicationStats = ({createdPublLength, likedPublLength, followedPublLength}) => {
    return (
        <div className= {styles.stats + " " + styles.row}>
        <div className={styles.stat + ' ' + styles['col-xs-4']} style={{ paddingRight: 50 }}>
          <p className={styles['number-stat']}>{createdPublLength}</p>
          <p className={styles['desc-stat']}>Publications created</p>
        </div>
        <div className={styles.stat + ' ' + styles['col-xs-4']}>
          <p className={styles['number-stat']}>{likedPublLength}</p>
          <p className={styles['desc-stat']}>Publications liked</p>
        </div>
        <div className={styles.stat + ' ' + styles['col-xs-4']} style={{ paddingLeft: 50 }}>
          <p className={styles['number-stat']}>{followedPublLength}</p>
          <p className={styles['desc-stat']}>Publications followed</p>
        </div>
      </div>
    )
}