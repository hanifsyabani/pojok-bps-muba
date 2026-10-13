import { ensureDesilBucket } from "./index";

try {
  await ensureDesilBucket();
  console.log("Private document bucket is ready.");
} catch (error) {
  console.error(error instanceof Error ? error.message : "Document storage setup failed.");
  process.exitCode = 1;
}
