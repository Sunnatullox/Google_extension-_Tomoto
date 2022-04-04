chrome.alarms.create("TomatoTimer",{
    periodInMinutes: 1/60
})

chrome.alarms.onAlarm.addListener((alarm)=>{
    if(alarm.name = "TomatoTimer"){
        chrome.storage.local.get(['timer', 'isRunning',"timeOptins"], (result) => {
            if(result.isRunning){
                let timer = result.timer + 1
                let isRunning = true
                if(timer === 60 * result.timeOptins ){
                    this.registration.showNotification("Tomato Timer",{
                        body:`${result.timeOptins} minutes has passed`,
                        icon:"tomato.png"
                    })
                    timer = 0
                    isRunning= false
                }
                chrome.storage.local.set({timer, isRunning})
            }
        })
    }
})


chrome.storage.local.get(['timer', 'isRunning', "timeOptins"],(result)=>{
    chrome.storage.local.set({
        timer:"timer" in result ? result.timer : 0,
        timeOptins:"timeOptins" in result ? result.timeOptins: 25,
        isRunning:"isRunning" in result ? result.isRunning : false
    })
})
