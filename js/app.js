const API_URL = "http://localhost:5000/analyze";

const imageInput = document.getElementById("imageInput");
const previewWrap = document.getElementById("previewWrap");
const previewImage = document.getElementById("previewImage");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusText = document.getElementById("statusText");
const resultSection = document.getElementById("resultSection");
const listenBtn = document.getElementById("listenBtn");
const languageSelect = document.getElementById("languageSelect");
const ocrCorrection = document.getElementById("ocrCorrection");

const medicineText = document.getElementById("medicineText");
const dosageText = document.getElementById("dosageText");
const purposeText = document.getElementById("purposeText");
const precautionsText = document.getElementById("precautionsText");

let latestExplanation = "";

// Guard so this script can be loaded safely on any page.
if (imageInput && analyzeBtn) {
  imageInput.addEventListener("change", handleImagePreview);
  analyzeBtn.addEventListener("click", analyzePrescription);
  listenBtn.addEventListener("click", playVoiceExplanation);
}

function handleImagePreview() {
  const file = imageInput.files && imageInput.files[0];

  if (!file) {
    previewWrap.classList.remove("visible");
    statusText.textContent = "";
    return;
  }

  previewImage.src = URL.createObjectURL(file);
  previewWrap.classList.add("visible");

  setStatus("Image uploaded. Click Analyze Prescription.");
}

async function analyzePrescription() {
  const file = imageInput.files && imageInput.files[0];

  if (!file) {
    alert("Please upload a prescription image first.");
    return;
  }

  setLoadingState(true);

  const formData = new FormData();
  formData.append("image", file);

  // Optional hint text gives users quick control over OCR corrections.
  const correctionText = ocrCorrection.value.trim();
  if (correctionText) {
    formData.append("ocrCorrection", correctionText);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Server request failed");
    }

    const data = await response.json();

    medicineText.textContent = data.medicine || "Not detected";
    dosageText.textContent = data.dosage || "Not provided";
    purposeText.textContent = data.purpose || "Not provided";
    precautionsText.textContent = data.precautions || "Not provided";

    latestExplanation =
      data.fullExplanation ||
      `${data.medicine || "Medicine"}. Dosage: ${data.dosage || "N/A"}. Purpose: ${data.purpose || "N/A"}. Precautions: ${data.precautions || "N/A"}.`;

    resultSection.classList.add("visible");
    setStatus("Analysis complete.");
  } catch (error) {
    console.error("Analyze error:", error);
    setStatus("Something went wrong. Please try again.", true);
  } finally {
    setLoadingState(false);
  }
}

function playVoiceExplanation() {
  if (!latestExplanation) {
    alert("Please analyze a prescription first.");
    return;
  }

  if (!("speechSynthesis" in window)) {
    alert("Speech feature is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(latestExplanation);
  utterance.lang = languageSelect.value || "en-IN";
  utterance.rate = 0.96;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

function setLoadingState(isLoading) {
  analyzeBtn.disabled = isLoading;

  if (isLoading) {
    analyzeBtn.textContent = "Analyzing...";
    setStatus('<span class="spinner" aria-hidden="true"></span>Analyzing...', false, true);
    return;
  }

  analyzeBtn.textContent = "Analyze Prescription";
}

function setStatus(message, isError = false, allowHtml = false) {
  statusText.classList.toggle("error", isError);

  if (allowHtml) {
    statusText.innerHTML = message;
    return;
  }

  statusText.textContent = message;
}
