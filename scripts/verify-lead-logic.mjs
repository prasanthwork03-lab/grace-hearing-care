import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom"
});

try {
  const { classifyLeadLocation, validateLead } = await server.ssrLoadModule(
    "/src/lib/leadValidation.js"
  );

  const cases = [
    ["Mylapore, Chennai", "new_chennai_lead", true, "verified_chennai_area"],
    ["R A Puram", "new_chennai_lead", true, "verified_chennai_area"],
    ["Coimbatore", "outside_chennai_lead", false, "outside_chennai"],
    ["Perambur", "needs_location_verification", false, "unverified"]
  ];

  for (const [area, leadStatus, isChennaiLead, locationVerification] of cases) {
    const result = classifyLeadLocation(area);
    const passed =
      result.leadStatus === leadStatus &&
      result.isChennaiLead === isChennaiLead &&
      result.locationVerification === locationVerification;

    if (!passed) {
      throw new Error(`Unexpected location classification for ${area}: ${JSON.stringify(result)}`);
    }
  }

  const validation = validateLead({
    name: "Test User",
    phone: "+91 98400 29521",
    area: "Madurai",
    requirement: "Hearing Aid Trial",
    preferredContact: "Call"
  });

  if (
    !validation.isValid ||
    validation.phoneClean !== "9840029521" ||
    validation.leadStatus !== "outside_chennai_lead"
  ) {
    throw new Error(`Unexpected lead validation result: ${JSON.stringify(validation)}`);
  }

  console.log("Lead validation tests: 5 passed");
} finally {
  await server.close();
}
