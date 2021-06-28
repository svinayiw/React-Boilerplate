import { message, Alert } from 'antd';
import { IError } from '../interfaces/IHttp';

export function notifyError(err: IError) {
  message.error(
    <>
      {err?.data?.message}
      {err?.data?.details?.map((e: string, index: number) => (
        <span style={{ display: 'block' }} key={index}>
          {e}
        </span>
      ))}
    </>
  );
}

export function alertError(err: IError) {
  return err?.data?.details?.map((e: string, index: number) => {
    return <Alert message={e} type="error" />;
  });
}
