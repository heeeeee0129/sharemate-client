import { useEffect, useState } from "react";
import { useRadio } from "./useRadio";

export const useMbti = () => {
  const [mbti, setMbti] = useState<any>({
    EI: null,
    NS: null,
    TF: null,
    JP: null,
  });

  const { Component: EandISelect, state: EI } = useRadio({
    contentList: ["E", "I"],
    arrange: "row",
    defaultState: mbti.EI,
  });
  const { Component: NandSSelect, state: NS } = useRadio({
    contentList: ["N", "S"],
    arrange: "row",
    defaultState: mbti.NS,
  });
  const { Component: TandFSelect, state: TF } = useRadio({
    contentList: ["T", "F"],
    arrange: "row",
    defaultState: mbti.TF,
  });
  const { Component: JandPSelect, state: JP } = useRadio({
    contentList: ["J", "P"],
    arrange: "row",
    defaultState: mbti.JP,
  });

  useEffect(() => {
    if (EI && NS && TF && JP)
      setMbti({
        EI,
        NS,
        TF,
        JP,
      });
  }, [EI, NS, TF, JP]);

  return {
    state: mbti.EI + mbti.NS + mbti.TF + mbti.JP,
    Component: () => (
      <>
        <p className="mt-2 ml-2 text-xl">MBTI를 선택해주세요.</p>
        <div className="flex items-center justify-center">
          <EandISelect />
          <NandSSelect />
          <TandFSelect />
          <JandPSelect />
        </div>
      </>
    ),
  };
};

export const useRegisterForm = () => {
  const { Component: MbtiSelect, state: mbti } = useMbti();

  const { Component: SleepTimeSelect, state: sleepTime } = useRadio({
    contentList: ["5시간 미만", "5시간 이상"],
    title: "수면 시간을 선택해주세요.",
  });
  const { Component: SmokingSelect, state: smoking } = useRadio({
    contentList: ["흡연", "비흡연"],
    title: "흡연 유무를 선택해주세요.",
  });
  const { Component: LivingPatternSelect, state: wakeupTime } =
    useRadio({
      contentList: ["올빼미형", "아침형"],
      title: "생활 패턴을 선택해주세요.",
    });
  const { Component: DrinkSelect, state: drinking } = useRadio({
    contentList: ["1", "2", "3", "4"],
    title: "일주일 내 음주 횟수를 입력해주세요.",
  });
  const { Component: CleannessSelect, state: cleanness } = useRadio({
    contentList: ["청결에 예민", "청결에 둔감"],
    title: "청결도를 선택해주세요.",
  });
  const { Component: SnoringSelect, state: snoring } = useRadio({
    contentList: ["상", "중", "하", "무"],
    title: "코골이 유무를 선택해주세요.",
  });

  useEffect(() => {
    console.log(
      "진짜",
      mbti,
      sleepTime,
      smoking,
      wakeupTime,
      drinking,
      cleanness,
      snoring
    );
  }, [
    mbti,

    sleepTime,
    smoking,
    wakeupTime,
    drinking,
    cleanness,
    snoring,
  ]);

  return {
    state: {
      mbti,

      sleepTime,
      smoking,
      wakeupTime,
      drinking,
      cleanness,
      snoring,
    },
    Component: () => (
      <>
        <h1 className="text-[33px] py-[30px] p-3 text-bold text-left text-black mb-14 ml-2">
          당신은 <br />
          어떤 룸메이트인가요?
        </h1>
        <div className="my-10">
          <MbtiSelect />
        </div>
        <SleepTimeSelect />
        <SmokingSelect />
        <LivingPatternSelect />
        <DrinkSelect />
        <CleannessSelect />
        <SnoringSelect />
      </>
    ),
  };
};