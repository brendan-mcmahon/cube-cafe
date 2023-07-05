import { useEffect } from 'react';

const useLockOrientation = (orientation: 'portrait' | 'landscape' = 'landscape') => {
    useEffect(() => {
        const lockOrientation = async () => {
            try {
                await screen.orientation.lock(orientation);
            } catch (error) {
                console.error(`Could not lock screen orientation: ${error}`);
            }
        };

        if ('orientation' in screen) {
            lockOrientation();
        } else {
            console.warn('Your browser does not support the Screen Orientation API.');
        }

        return () => {
            if ('orientation' in screen) {
                screen.orientation.unlock();
            }
        };
    }, [orientation]);
};

export default useLockOrientation;
