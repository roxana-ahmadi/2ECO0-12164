"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { IBanks, IFormInputs } from "./types";
import Link from "next/link";

const commaSeprator = (x: number | undefined): string | undefined => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const numberRegex = new RegExp("^09[0|1|2|3][0-9]{8}$");

export default function ShopPage() {
  const [showBank, setShowBank] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [banks, setBanks] = useState<IBanks[]>();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>({
    defaultValues: {
      simType: "credit",
      optionalPrice: "20000",
      price: "20000",
    },
  });

  const { number, simType, incredible, price, optionalPrice, email } = watch();

  const finalPriceCalculator = (): number | undefined => {
    if (price && price !== "other") {
      return +price * 0.1 + +price;
    } else if (optionalPrice) {
      return +optionalPrice * 0.1 + +optionalPrice;
    } else return 0;
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (): Promise<
    IBanks[] | void
  > => {
    setShowBank(true);
    setDisableForm(true);

    try {
      const result = await new Promise<IBanks[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              { name: "پارسیان", url: "" },
              { name: "ملت", url: "" },
            ]),
          2000
        )
      );
      setBanks(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-4 lg:p-11 w-full lg:w-2/3 shadow-2xl bg-white rounded-md ">
        <div className="flex flex-col lg:flex-row">
          <div className="text-black lg:w-2/3 w-full flex flex-col items-center gap-2 p-3">
            <h1 className="font-bold text-lg">خرید آنلاین شارژ ایرانسل</h1>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8 rounded w-full items-center lg:max-w-[700px] mb-10 mx-auto space-y-2"
            >
              <p className="flex justify-center text-gray-500 text-lg">
                نوع سیمکارت
              </p>
              <Controller
                name="simType"
                control={control}
                render={({ field }) => {
                  return (
                    <ToggleButtonGroup
                      disabled={disableForm}
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
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 rounded-full font-bold"
                        value="credit"
                      >
                        اعتباری
                      </ToggleButton>
                      <ToggleButton
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 rounded-full font-bold"
                        value="permanent"
                      >
                        دائمی
                      </ToggleButton>
                    </ToggleButtonGroup>
                  );
                }}
              />

              <Controller
                name="incredible"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          {...field}
                          disabled={
                            disableForm || watch("simType") !== "credit"
                          }
                        />
                      }
                      label="شارژ شگفت انگیز"
                    />
                  </FormGroup>
                )}
              />

              <input
                disabled={disableForm}
                {...register("number", {
                  required: true,
                  validate: (fieldValue) => {
                    return !!fieldValue.match(numberRegex)?.length;
                  },
                })}
                type="number"
                name="number"
                onWheelCapture={(e) => {
                  e.currentTarget.blur();
                }}
                placeholder="شماره تلفن همراه"
                className={`border rounded-full h-14 w-full lg:w-96 px-3 text-black ${
                  errors.number && "border-red-600"
                }`}
              />

              <label>مبلغ شارژ</label>

              <Controller
                disabled={disableForm}
                name="price"
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
                      sx={[
                        {
                          "&.MuiToggleButtonGroup-root": {
                            display: "grid",
                            gridTemplateColumns: "auto auto auto",
                            gap: "20px",
                          },
                        },
                      ]}
                    >
                      <ToggleButton
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 !rounded-full !border-x !border-solid font-bold"
                        value={"10000"}
                      >
                        10,000
                      </ToggleButton>
                      <ToggleButton
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 !rounded-full !border-x  font-bold"
                        value={"20000"}
                      >
                        20,000
                      </ToggleButton>
                      <ToggleButton
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 !rounded-full !border-x font-bold"
                        value={"50000"}
                      >
                        50,000
                      </ToggleButton>
                      <ToggleButton
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 !rounded-full !border-x font-bold"
                        value={"100000"}
                      >
                        100,000
                      </ToggleButton>
                      <ToggleButton
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 !rounded-full !border-x font-bold"
                        value={"200000"}
                      >
                        200,000
                      </ToggleButton>
                      <ToggleButton
                        sx={[
                          {
                            "&.Mui-selected, &.Mui-selected:hover": {
                              backgroundColor: "#fc0",
                            },
                          },
                        ]}
                        className="w-24 !rounded-full !border-x font-bold"
                        value={"other"}
                      >
                        سایر مبالغ
                      </ToggleButton>
                    </ToggleButtonGroup>
                  );
                }}
              />

              {watch("price") === "other" && (
                <div>
                  <input
                    disabled={disableForm}
                    {...register("optionalPrice", {
                      required: true,
                      max: 900000,
                      min: 10000,
                    })}
                    type="number"
                    name="optionalPrice"
                    placeholder="مبلغ شارژ به ریال"
                    className={`border h-14 rounded-full w-full lg:w-96 px-3 text-black ${
                      errors.optionalPrice && "border-red-600"
                    }`}
                  />
                  <div
                    className={`flex justify-center text-sm mt-2 text-gray-500 ${
                      errors.optionalPrice &&
                      " border-solid border border-red-600  bg-red-300 text-red-950 rounded-full"
                    }`}
                  >
                    حداقل 10,000ریال و حداکثر 900,000ریال
                  </div>
                </div>
              )}

              <input
                disabled={disableForm}
                {...register("email", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "",
                  },
                })}
                type="email"
                name="email"
                placeholder="ایمیل(اختیاری)"
                className={`border h-14 rounded-full w-full lg:w-96 px-3 text-black ${
                  errors.email && "border-red-600"
                }`}
              />

              {!showBank && (
                <button
                  className="border rounded-full h-14 font-bold w-full lg:w-96 bg-[#fc0]"
                  type="submit"
                >
                  انتخاب بانک و پرداخت
                </button>
              )}
            </form>
            {showBank && (
              <>
                {banks && (
                  <div className="flex p-8 gap-6 bg-gray-200 w-80 h-40">
                    <div className="flex-grow">انتخاب بانک</div>
                    {banks.map((item, index) => (
                      <div key={index}>
                        <Link href={item.url}>{item.name}</Link>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className="border rounded-full h-14 font-bold w-full lg:w-96 bg-[#fc0]"
                  type="submit"
                >
                  {isSubmitting ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "پرداخت و شارژ"
                  )}
                </button>
                <button
                  onClick={() => {
                    setDisableForm(false);
                    setShowBank(false);
                  }}
                  className="border-none text-blue-800 font-bold"
                >
                  انصراف
                </button>
              </>
            )}
          </div>
          <div className="text-black hidden lg:flex lg:w-1/3 w-full bg-gray-200 rounded-md flex-col gap-6 p-3">
            <div
              className="bg-white w-full flex justify-center rounded-md p-4 text-lg font-bold
            "
            >
              فاکتور نهایی
            </div>
            <div className="mr-6">
              <div className="text-gray-500 text-sm">نوع سیمکارت</div>
              <div className="my-2 font-bold">
                {simType === "credit" ? "اعتباری" : "دائمی"}
              </div>
            </div>
            <div className="mr-6">
              <div className="text-gray-500 text-sm">مستقیم به شماره</div>
              <div className="my-2 font-bold">{number || " --- "}</div>
            </div>
            <div className="mr-6">
              <div className="text-gray-500 text-sm">
                مبلغ شارژ (با احتساب مالیات بر ارزش افزوده)
              </div>
              <div className="my-2 font-bold">
                {commaSeprator(finalPriceCalculator())} ریال{" "}
              </div>
            </div>
            <div className="mr-6">
              <div className="text-gray-500 text-sm">نوع شارژ </div>
              <div className="my-2 font-bold">
                {incredible ? "شگفت انگیز" : "معمولی"}
              </div>
            </div>
            <div className="mr-6">
              <div className="text-gray-500 text-sm">ایمیل</div>
              <div className="my-2 font-bold">{email || " --- "}</div>
            </div>
            <div className="mr-6">
              <div className="text-gray-500 text-sm">نام بانک</div>
              <div className="my-2 font-bold">{email || " --- "}</div>
            </div>
          </div>
          <div className="text-black lg:hidden flex  w-full bg-[#fff5cc] border-[#ffd733] text-sm rounded-md flex-col p-3">
            <div className="mb-2 flex">
              <div className="text-gray-500 text-sm flex-1">نوع سیمکارت</div>
              <div className="font-bold text-end flex-1">
                {simType === "credit" ? "اعتباری" : "دائمی"}
              </div>
            </div>
            <div className="mb-2 flex">
              <div className="text-gray-500 text-sm flex-1">
                مستقیم به شماره
              </div>
              <div className="font-bold text-end flex-1">
                {number || " --- "}
              </div>
            </div>
            <div className="mb-2 flex">
              <div className="text-gray-500 text-sm flex-1">
                مبلغ شارژ (+مالیات)
              </div>
              <div className="font-bold text-end flex-1">
                {commaSeprator(finalPriceCalculator())} ریال{" "}
              </div>
            </div>
            <div className="mb-2 flex">
              <div className="text-gray-500 text-sm flex-1">نوع شارژ </div>
              <div className="font-bold text-end flex-1">
                {incredible ? "شگفت انگیز" : "معمولی"}
              </div>
            </div>
            <div className="mb-2 flex">
              <div className="text-gray-500 text-sm flex-1">ایمیل</div>
              <div className="font-bold text-end flex-1">
                {email || " --- "}
              </div>
            </div>
            <div className="mb-2 flex">
              <div className="text-gray-500 text-sm flex-1">نام بانک</div>
              <div className="font-bold text-end flex-1">
                {email || " --- "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
