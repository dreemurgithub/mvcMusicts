import dotenv from "dotenv";
dotenv.config();
import { regexPassword, regexUserName } from "@/validations/regex.validate";
import { checkUsername } from "./helper";

const errorUserCheck = async ({
  name,
  password,
  username,
}: {
  name: string;
  password: string;
  username: string;
}) => {
  if (!name || !username || !password)
    return {
      success: false,
      message: "Missing display name/username/name/password",
    };
  if (!regexUserName.test(username))
    return {
      success: false,
      message: "Username too short",
    };
  if (!regexPassword.test(password))
    return {
      success: false,
      message:
        "Password contain atleast 5 characters, a number, a lowercase and uppercase",
    };
  return { success: true, message: "", data: null };
};

const checkUsernameExist = async (username: string) => {
  const check = await checkUsername(username);
  if (check) return { success: true, message: "", data: null };
  return {
    success: false,
    message: "This username is already taken",
  };
};
export { errorUserCheck, checkUsernameExist };
