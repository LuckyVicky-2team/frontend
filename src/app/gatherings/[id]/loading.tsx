import styles from './_components//GatheringDetails/GatheringDetails.module.scss';

export default function Loading() {
  return (
    <div style={{ margin: '49px 0 120px' }}>
      <div className={styles.section1}>
        <div
          className={styles.thumbnailBackground}
          style={{ backgroundColor: '#f0f0f0' }}
        />
        <div className={styles.gatheringInfo}>
          <div className={styles.firstGatheringInfo}>
            <div className={styles.firstGatheringInfoContent}>
              <div
                className={styles.skeleton}
                style={{ width: '80%', height: '24px', marginBottom: '10px' }}
              />
              <div
                className={styles.skeleton}
                style={{ width: '60%', height: '18px', marginBottom: '10px' }}
              />
              <div
                className={styles.skeleton}
                style={{ width: '90%', height: '18px', marginBottom: '10px' }}
              />
              <div
                className={styles.skeleton}
                style={{ width: '50%', height: '18px', marginBottom: '20px' }}
              />

              <div
                className={styles.skeleton}
                style={{ width: '30%', height: '24px', marginBottom: '8px' }}
              />
              <div
                className={styles.skeleton}
                style={{ width: '40%', height: '18px', marginBottom: '8px' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <h2 className={styles.title2}> 모임원 모집</h2>
        <div className={styles.convertedContent}>
          <div
            className={styles.skeleton}
            style={{ width: '100%', height: '120px' }}
          />
        </div>
      </div>

      <div className={styles.section4}>
        <h2 className={styles.h2}>모임장 정보</h2>
        <div className={styles.leaderProfile}>
          <div
            className={styles.skeleton}
            style={{ width: '56px', height: '56px', borderRadius: '50%' }}
          />
          <div className={styles.leaderDescription}>
            <div
              className={styles.skeleton}
              style={{ width: '50%', height: '18px', marginBottom: '5px' }}
            />
            <div
              className={styles.skeleton}
              style={{ width: '40%', height: '14px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
