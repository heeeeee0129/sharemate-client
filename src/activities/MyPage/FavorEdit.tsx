import { useEffect, useState } from "react";
import useModifyForm from "../../hooks/useModifyForm";
import { useFlow } from "../../stackflow";
import request from "../../stores/Request";
import { useFavor, useUser } from "../../stores/user";

const ModifyFavor = () => {
  const { pop } = useFlow();
  const { Component: ModifyForm, state } = useModifyForm();
  const [intro, setIntro] = useState("");

  const submitHandler = () => {
    const result = {
      mbti: state.Mbti,
      sleepTime: state.SleepTime,
      smoking: state.Smoking,
      wakeupTime: state.WakeupTime,
      drinking: state.Drinking,
      studyTime: state.StudyTime,
      cleanness: state.Cleanness,
      snoring: state.Snoring,
      selfIntro: intro,
    };
    console.log(result);
    request
      .put("/favor", { result })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        alert("취향수정이 완료되었습니다.");
        pop();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    mbti,
    sleepTime,
    smoking,
    wakeupTime,
    drinking,
    studyTime,
    cleanness,
    snoring,
    selfIntro,
  } = useFavor();

  useEffect(() => {
    state.Mbti = mbti;
    state.SleepTime = sleepTime;
    state.Smoking = smoking;
    state.WakeupTime = wakeupTime;
    state.Drinking = drinking;
    state.StudyTime = studyTime;
    state.Cleanness = cleanness;
    state.Snoring = snoring;
    setIntro(selfIntro);
  }, []);

  return (
    <div className="px-3 py-8 h-[93%] overflow-y-scroll scrollbar-hide">
      <ModifyForm />
      <div className="m-2 mb-14">
        <p className="my-4 mt-10 ml-2 text-md">
          자기소개 글을 입력해주세요.(50자 이내)
        </p>
        <input
          className=" w-full h-[150px] px-4 mb-8 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-[#F65B8082] border border-coolGray-200 rounded-lg shadow-input"
          id="selfIntro"
          value={intro}
          type="text"
          onChange={(e) => {
            setIntro(e.target.value);
          }}
        />
        <button className="w-[100px] h-[44px] m-2 float-left ring-2 ring-[#ab82e0] text-[#ab82e0] font-extrabold text-sm borde rounded-md shadow-button">
          이전
        </button>
        <button
          onClick={submitHandler}
          className="w-[100px] h-[44px] m-2 float-right ring-2 ring-[#ab82e0] text-[#ab82e0] font-extrabold text-sm borde rounded-md shadow-button"
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default ModifyFavor;