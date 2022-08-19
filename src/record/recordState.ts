import { useCallback } from "react";
import {
  atom,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ApiRecord } from "./record.api-service";
import { Record } from "./record-model";
import { RecoilAtomKeys } from "../store/RecoilKeys";
export const recordState = atom<Array<Record>>({
  key: RecoilAtomKeys.RECORD_STATE,
  default: [],
});

const useRecords = () => {
  return {
    records: useRecoilValue(recordState),
  };
};

const useChangeRecord = () => {
  return {
    createRecord: useRecoilCallback(({ set }) => (id: number) => {
      ApiRecord.creatRecord(id).then(() => {
        ApiRecord.getAllRecordsData().then((res) => set(recordState, res)); //課題 onClickCreateRecordAddStockではこの書き方では反映せず
      });
    }),
    updateRecord: useRecoilCallback(({ set }) => (res: Array<Record>) => {
      set(recordState, res);
    }),
    deleteRecord: useRecoilCallback(({ set }) => (id: number) => {
      ApiRecord.deleteRecord(id).then(() => {
        ApiRecord.getAllRecordsData().then((res) => {
          set(recordState, res);
        });
      });
    }),
  };
};

const useInitRecords = () => {
  const setRecord = useSetRecoilState(recordState);
  return {
    initRecord: useCallback(() => {
      ApiRecord.getAllRecordsData()
        .then((res) => {
          setRecord(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []),
  };
};

export const RecordState = {
  useRecords,
  useChangeRecord,
  useInitRecords,
};
