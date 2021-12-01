import { useCallback, useRef } from 'react';
import PicCapture from '../PicCapture';

const Leave = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log({ imageSrc });
    // return [true, 0];
  }, [webcamRef]);
  return (
    <div>
      <PicCapture capture={capture} webcamRef={webcamRef} />
    </div>
  );
};

export default Leave;
