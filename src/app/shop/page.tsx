"use client";

import {
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const numberRegex = new RegExp("^09[0|1|2|3][0-9]{8}$");

interface IFormInputs {
  number: string;
  simType: string;
  incredible: boolean;
}

export default function ShopPage() {
  const [number, setNumber] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IFormInputs>();

  {
    errors.number && console.log("err", errors.number);
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <>
      <div
        dir="rtl"
        className="text-black flex flex-col justify-center items-center gap-6 bg-gray-300"
      >
        <h1>خرید آنلاین شارژ ایرانسل</h1>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 rounded max-w-[700px] mb-10 mx-auto space-y-2"
        >
          <Typography
            className="flex justify-center text-gray-500 "
            variant="subtitle1"
          >
            نوع سیمکارت
          </Typography>
          <Controller
            name="simType"
            control={control}
            render={({ field }) => {
              return (
                <ToggleButtonGroup
                  dir="ltr"
                  className="justify-center"
                  {...field}
                  onChange={(
                    event: React.MouseEvent<HTMLElement>,
                    value: string
                  ) => {
                    setValue(field.name, value);
                  }}
                  exclusive
                >
                  <ToggleButton
                    className="w-24 rounded-full focus:bg-yellow-500 hover:bg-inherit focus:hover:bg-yellow-500 visited:bg-yellow-500 font-bold	"
                    value="credit"
                  >
                    اعتباری
                  </ToggleButton>
                  <ToggleButton
                    className="w-24 rounded-full  focus:bg-yellow-500 hover:bg-inherit focus:hover:bg-yellow-500  visited:bg-yellow-500 font-bold"
                    value="permanent"
                  >
                    دایمی
                  </ToggleButton>
                </ToggleButtonGroup>
              );
            }}
          />

          <Controller
            name="incredible"
            control={control}
            render={({ field }) => <Switch {...field} />}
          />

          <input
            {...register("number", {
              required: true,
              validate: (fieldValue) => {
                return !!fieldValue.match(numberRegex)?.length;
              },
            })}
            type="number"
            name="number"
            placeholder="شماره تلفن همراه"
            className={`border rounded-full h-10 w-96 px-3 text-black ${
              errors.number && "border-red-600"
            }`}
          />

          <label>مبلغ شارژ</label>

          <button className="border rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div></div>
    </>
  );
}
