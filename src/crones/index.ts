import { oldVisitorCronJob } from "./old-visitor.crone";
import { removeOldPasswordsCronJob } from "./remove-old-passwords.crone";
import { removeOldTokensCronJob } from "./remove-old-tokens.crone";
import { testCronJob } from "./test.crone";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
  oldVisitorCronJob.start();
};
