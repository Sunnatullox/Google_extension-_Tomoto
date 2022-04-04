const timeOptins = document.getElementById("time_options");
timeOptins.addEventListener("click", (e) => {
  const val = e.target.value;
  if (val < 1 || val > 60) {
    timeOptins.value = 25;
  }
});

const saveBtn = document.getElementById("save_options");
saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({ timer: 0, timeOptins: timeOptins.value, isRunning:false });
});


chrome.storage.local.get(["timeOptins"], (result) => {
    timeOptins.value = result.timeOptins
})

