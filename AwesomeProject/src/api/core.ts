import {apiWrapper, BaseResp} from './utils';

interface IMilestone {
  id: number;
  purpose_id: number;
  title: string;
  description: string;
  start_date: string;
  start_time: string;
  due_date: string;
  due_time: string;
  is_delete: boolean;
}

type MilestoneResp = BaseResp<IMilestone[]>;

export const getMilestoneAPI = async (pid: string) => {
  const data = await apiWrapper<MilestoneResp>(
    `/core/getMilestone/${pid}`,
    undefined,
    true,
  );
  return data;
};
