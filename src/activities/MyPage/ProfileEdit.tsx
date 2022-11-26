import React, { useState, useRef, useCallback, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import request from "../../stores/Request";
import { useUser } from "../../stores/user";
import { useFlow } from "../../stackflow";

interface Profile {
  name: string;
  nickname: string;
  email: string;
  major: string;
  grade: string;
  kakao_id: string;
  profile_photo: string;
  kakao_link: string;
  age: string;
  gender: string;
}

const dumydata: Profile = {
  name: "장은학",
  nickname: "devnak",
  email: "showri0108@ajou.ac.kr",
  major: "소프트웨어학과",
  grade: "3학년",
  kakao_id: "test",
  profile_photo:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  kakao_link: "https://open.kakao.com/o/s2qDCFOe",
  age: "24",
  gender: "남성",
};

const ProfileEdit = () => {
  const { replace } = useFlow();
  const {
    age,
    email,
    gender,
    grade,
    kakao_link,
    major,
    name,
    profile_photo,
    setEditUser,
  } = useUser();

  const [editData, setEditData] = useState({
    email: email,
    gender: gender,
    name: name,
    major: major,
    grade: grade,
    age: age,
    kakao_link: kakao_link,
    profile_photo: profile_photo,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [editInfo, setEditInfo] = useState(dumydata);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    return setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadPhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setEditData((prev) => ({
      ...prev,
      profile_photo: URL.createObjectURL(e.target.files[0]),
    }));
  }, []);

  const onUploadPhoto = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, []);

  const editSubmit = () =>
    request
      .put("/user", { editData })
      .then((response) => {
        console.log(response.status);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

  const submitHandler = async () => {
    const nicknameRegEx = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;

    if (!nicknameRegEx.test(editInfo.nickname)) {
      alert("닉네임 형식에 맞춰주세요");
    } else {
      const result = await editSubmit();
      if (result) {
        alert("회원정보 수정이 완료되었습니다.");
        replace("MyPageActivity", {});
      }
    }
  };

  return (
    <div className="h-[85%]">
      <div className="h-[33%] flex flex-col pro:pt-[30px] pt-[20px] ">
        <div className="pro:text-3xl text-2xl font-bold pro:mb-[25px] mb-[20px] ml-[24px]">
          회원정보 수정
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-row items-center">
            <input
              type="file"
              name="profile_photo"
              className="hidden"
              onChange={uploadPhoto}
              accept="image/*"
              ref={inputRef}
            />
            <img
              className="rounded-full pro:w-[120px] pro:h-[120px] w-[80px] h-[80px] "
              src={editData.profile_photo}
              onClick={onUploadPhoto}
            />
          </div>
        </div>
      </div>
      <div className="h-[15%] pl-[24px] pr-[24px] border-b-4">
        <div className="flex flex-row pro:mb-[26px] mb-[15px]">
          <div className="text-[#AFADF5] text-base font-medium w-[29%]">
            이메일
          </div>
          <div className="text-[#AFADF5] text-base font-semibold w-[71%] border-b-2">
            {editData.email}
          </div>
        </div>
        <div className="flex flex-row pro:mb-[26px] mb-[15px]">
          <div className="text-[#AFADF5] text-base font-medium w-[29%]">
            성별
          </div>
          <div className="text-[#AFADF5] text-base font-semibold w-[71%] border-b-2">
            {editData.gender ? "남성" : "여성"}
          </div>
        </div>
      </div>
      <div className="h-[40%] pl-[24px] pr-[24px] pt-[25px]">
        <div className="flex flex-row pro:mb-[26px] mb-[15px]">
          <div className="text-[#AFADF5] text-base font-medium w-[29%]">
            닉네임
          </div>
          <div className="flex w-[71%] border-b-2 items-center">
            <input
              name="name"
              value={editData.name}
              className="w-full text-[#AFADF5] text-base font-semibold  outline-0"
              onChange={changeHandler}
            />
            {editData.name ? (
              <AiFillCloseCircle
                className="opacity-60"
                onClick={() => setEditData((prev) => ({ ...prev, name: "" }))}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-row pro:mb-[26px] mb-[15px]">
          <div className="text-[#AFADF5] text-base font-medium w-[29%]">
            학과
          </div>
          <div className="flex w-[71%] border-b-2 items-center">
            <input
              name="major"
              value={editData.major}
              className="w-full text-[#AFADF5] text-base font-semibold outline-0"
              onChange={changeHandler}
            />
            {editData.major ? (
              <AiFillCloseCircle
                className="opacity-60"
                onClick={() => setEditData((prev) => ({ ...prev, major: "" }))}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-row pro:mb-[26px] mb-[15px]">
          <div className="text-[#AFADF5] text-base font-medium w-[29%]">
            학년
          </div>
          <div className="flex w-[71%] border-b-2 items-center">
            <input
              name="grade"
              value={editData.grade}
              className="w-full text-[#AFADF5] text-base font-semibold  outline-0"
              onChange={changeHandler}
            />
            {editData.grade ? (
              <AiFillCloseCircle
                className="opacity-60"
                onClick={() => setEditData((prev) => ({ ...prev, grade: 0 }))}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-row pro:mb-[26px] mb-[15px]">
          <div className="text-[#AFADF5] text-base font-medium w-[29%]">
            나이
          </div>
          <div className="flex w-[71%] border-b-2 items-center">
            <input
              type="text"
              name="age"
              value={editData.age}
              className="w-full text-[#AFADF5] text-base font-semibold  outline-0"
              onChange={changeHandler}
            />
            {editData.age ? (
              <AiFillCloseCircle
                className="opacity-60"
                onClick={() => setEditData((prev) => ({ ...prev, age: 0 }))}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-row pro:mb-[26px] mb-[15px]">
          <div className="text-[#AFADF5] text-base font-medium w-[29%]">
            오픈채팅 링크
          </div>
          <div className="flex w-[71%] border-b-2 items-center">
            <input
              name="kakao_link"
              value={editData.kakao_link}
              className="w-full text-[#AFADF5] text-base font-semibold outline-0"
              onChange={changeHandler}
            />
            {editData.kakao_link ? (
              <AiFillCloseCircle
                className="opacity-60"
                onClick={() =>
                  setEditData((prev) => ({ ...prev, kakao_link: "" }))
                }
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full h-[9%] justify-center items-end">
        <button
          className="text-center w-[80%] h-[50%] ring-2 ring-[#9d6ddd] text-[#9d6ddd] bg-white bg-opacity-60 font-extrabold text-sm rounded-md shadow-button"
          onClick={submitHandler}
        >
          회원정보 수정
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;