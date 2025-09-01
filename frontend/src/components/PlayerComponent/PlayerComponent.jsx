import React, { useEffect, useRef, useState } from 'react';
import styles from './PlayerComponent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

function PlayerComponent(props) {
    const { sample, handleNextSample, handlePrevSample } = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Tracks if page is loaded for the first time

    const audioRef = useRef(null);

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handlePlay = () => {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch((error) => console.warn("Autoplay blocked:", error));
        }
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handlePlayPause = () => {
        isPlaying ? handlePause() : handlePlay();
    };

    const formatDuration = (durationSeconds) => {
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // Wait for first interaction before loading and playing
    useEffect(() => {
        // Handle when user interacts with the page
        const onUserInteraction = () => {
            if (!isFirstLoad && sample) {
                audioRef.current.load(); // Load the audio
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsPlaying(true))
                        .catch((error) => console.warn("Autoplay blocked:", error));
                }
            }
            setIsFirstLoad(false);
            // Remove event listener after the first interaction
            document.removeEventListener('click', onUserInteraction);
        };

        // Wait for the user to interact with the page
        document.addEventListener('click', onUserInteraction);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', onUserInteraction);
        };
    }, [sample, isFirstLoad]);

    // Handle metadata and time update
    useEffect(() => {
        if (!audioRef.current) return;

        const audioElement = audioRef.current;

        const handleMetadataLoaded = () => {
            setDuration(audioElement.duration);
        };

        audioElement.addEventListener('loadedmetadata', handleMetadataLoaded);
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleMetadataLoaded);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [sample]);

    return (
        <div className={styles.player}>
            <div className={styles.coverWrapper}>
                <img src={`${process.env.PUBLIC_URL}/sample-covers/${sample.cover}`} alt={`${sample.name}'s cover`} />
            </div>

            <div className={styles.sampleInfo}>
                <p className={styles.sampleName}>{sample.name}</p>
                <p className={styles.sampleTitle}>{sample.title}</p>

                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className={styles.sampleDurationRange}
                />

                <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/music/${sample.source}`} />

                <div className={styles.trackDuration}>
                    <p>{formatDuration(currentTime)}</p>
                    <p>{formatDuration(duration)}</p>
                </div>

                <div className={styles.buttonsContainer}>
                    <button
                        onClick={() => {
                            handlePrevSample();
                            setIsPlaying(false);
                        }}
                    >
                        <span className={styles.clickIcon}>
                            <FontAwesomeIcon icon={faBackward} />
                        </span>
                    </button>
                    <button onClick={handlePlayPause}>
                        <span className={styles.clickIcon}>
                            {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </span>
                    </button>
                    <button
                        onClick={() => {
                            handleNextSample();
                            setIsPlaying(false);
                        }}
                    >
                        <span className={styles.clickIcon}>
                            <FontAwesomeIcon icon={faForward} />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlayerComponent;