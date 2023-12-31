//web worker to stream text
curr_message = ""

curr_index = 0

//sleep promise
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

self.onmessage = (e) => {

    const recieved_message = e.data

    console.log("recieved message - " + recieved_message)
    
    if (recieved_message === curr_message) {

        console.log("text same")

        if (curr_index <= curr_message.length) {

            curr_index += 1
            self.postMessage(curr_message.slice(0, curr_index))

        }

    } else {

        console.log("text different")

        curr_index = 0
        curr_message = recieved_message

        self.postMessage(recieved_message)

    }

  };

