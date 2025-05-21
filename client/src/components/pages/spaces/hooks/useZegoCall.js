import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Replace with your actual Zego App ID and Server Secret
const APP_ID = 127629892; // Verify this is correct
const SERVER_SECRET = '40f6d8298a0d1f3d809f67c87dea677d'; // Verify this is correct

const useZegoCall = (localUserId, nearbyUsers, spaceId) => {
  const callContainerRef = useRef(null);
  const instanceRef = useRef(null);
  const roomId = spaceId;

  useEffect(() => {
    if (!localUserId || !spaceId) {
      console.warn('Missing localUserId or spaceId, skipping Zego call initialization', {
        localUserId,
        spaceId,
      });
      return;
    }

    const startCall = async () => {
      if (!callContainerRef.current) {
        console.error('callContainerRef is not set, cannot start Zego call');
        return;
      }
      if (instanceRef.current) {
        console.warn('Zego instance already exists, skipping initialization');
        return;
      }

      try {
        console.log('Generating Zego token for user:', localUserId, 'in room:', roomId);
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          APP_ID,
          SERVER_SECRET,
          roomId,
          localUserId,
          `User-${localUserId}`
        );

        console.log('Creating Zego instance');
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        instanceRef.current = zp;

        console.log('Joining Zego room with container:', callContainerRef.current);
        zp.joinRoom({
          container: callContainerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
            config: {
              videoResolutionLevel: ZegoUIKitPrebuilt.VideoResolution_180P, // Low resolution for small videos
            },
          },
          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: true,
          showPreJoinView: false,
          sharedLinks: [],
          onJoinRoom: () => console.log('Successfully joined Zego room:', roomId),
          onLeaveRoom: () => console.log('Left Zego room:', roomId),
          onUserJoin: (users) => console.log('Users joined Zego room:', users),
          onUserLeave: (users) => console.log('Users left Zego room:', users),
          onError: (error) => console.error('Zego room error:', error),
        });
      } catch (error) {
        console.error('Error initializing Zego call:', error);
      }
    };

    const stopCall = () => {
      if (instanceRef.current) {
        console.log('Destroying Zego instance');
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
      if (callContainerRef.current) {
        callContainerRef.current.innerHTML = '';
        console.log('Cleared call container');
      }
    };

    console.log('useZegoCall: nearbyUsers:', nearbyUsers, 'localUserId:', localUserId);
    if (nearbyUsers.length > 0) {
      console.log('Starting Zego call due to nearby users');
      const timeout = setTimeout(startCall, 300);
      return () => {
        console.log('Cleaning up Zego call');
        clearTimeout(timeout);
        stopCall();
      };
    } else {
      console.log('No nearby users, stopping Zego call');
      stopCall();
    }

    return stopCall;
  }, [localUserId, nearbyUsers, spaceId]);

  return callContainerRef;
};

export default useZegoCall;