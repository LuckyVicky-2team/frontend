'use client';
import { useEffect } from 'react';
import styles from './_components/GatheringDetails/GatheringDetails.module.scss';
import Image from 'next/image';

export default function Loading() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ margin: '60px 16px 120px' }}>
      {/*  상단 이미지 및 모임 정보 */}
      <div className={styles.section1} style={{ paddingBottom: '20px' }}>
        <div
          className={styles.thumbnailBackground}
          style={{
            backgroundColor: '#f0f0f0',
            height: '255px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        />
        <div className={styles.gatheringInfo}>
          <div className={styles.skeletonContent}>
            <div className={styles.firstGatheringInfoContent}>
              {/* 모임 제목 */}
              <div
                className={styles.skeleton}
                style={{ width: '80%', height: '24px', marginBottom: '12px' }}
              />
              <div
                className={styles.skeleton}
                style={{ width: '30%', height: '18px', marginBottom: '12px' }}
              />

              {/* 날짜 및 시간 태그 */}
              <div
                style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <div
                  className={styles.skeleton}
                  style={{ width: '70px', height: '22px', borderRadius: '4px' }}
                />
                <div
                  className={styles.skeleton}
                  style={{ width: '60px', height: '22px', borderRadius: '4px' }}
                />
              </div>

              {/* 위치 */}
              <div
                className={styles.skeleton}
                style={{ width: '40%', height: '18px', marginBottom: '10px' }}
              />
              <div style={{ marginBottom: '14px', display: 'flex' }}>
                <div
                  className={styles.skeleton}
                  style={{
                    marginRight: '8px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                  }}
                />
                <div
                  className={styles.skeleton}
                  style={{ width: '20%', height: '22px' }}
                />
              </div>
              <div
                className={styles.skeleton}
                style={{
                  width: '20%',
                  height: '24px',
                  marginBottom: '10px',
                  borderRadius: '10px',
                }}
              />
            </div>
          </div>
          {/* 구분선 */}
          <div className={styles.stroke}>
            <Image alt="점선" src={'/assets/icons/stroke.svg'} fill />
          </div>
          <div style={{ padding: '20px', width: '100%' }}>
            {/*모집 진행도 및 참여자 */}
            <div className={styles.section3} style={{ padding: '12px 0' }}>
              <div className={styles.people}>
                <span className={styles.totalParticipantCount}>모집 정원</span>
                {/*참여자 리스트 */}
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                  }}>
                  <div
                    className={styles.skeleton}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                    }}
                  />
                </div>
              </div>

              {/* 모집 진행 바 */}
              <div
                className={styles.progressBarBackground}
                style={{
                  height: '100%',
                  minHeight: '8px',
                  backgroundColor: '#ddd',
                  borderRadius: '4px',
                  marginTop: '12px',
                  margin: '12px 0 30px 0',
                }}
              />

              {/* 모집 참여 버튼 */}
              <div
                className={styles.skeleton}
                style={{
                  width: '100%',
                  height: '48px',
                  marginTop: '16px',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/*  모임 상세 내용 */}
      <div className={styles.section2}>
        <h2 className={styles.title2} style={{ marginBottom: '12px' }}>
          모임원 모집
        </h2>
        <div className={styles.convertedContent}>
          <div
            className={styles.skeleton}
            style={{ width: '100%', height: '120px', borderRadius: '8px' }}
          />
        </div>
      </div>
      {/*  모임장 정보 */}
      <div className={styles.section4} style={{ paddingTop: '24px' }}>
        <h2 className={styles.h2} style={{ marginBottom: '12px' }}>
          모임장 정보
        </h2>
        <div className={styles.leaderProfile} style={{ padding: '16px' }}>
          <div
            className={styles.skeleton}
            style={{ width: '58px', height: '58px', borderRadius: '50%' }}
          />
          <div
            className={styles.leaderDescription}
            style={{ marginLeft: '12px' }}>
            <div
              className={styles.skeleton}
              style={{ width: '55%', height: '20px', marginBottom: '6px' }}
            />
            <div
              className={styles.skeleton}
              style={{ width: '45%', height: '16px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
