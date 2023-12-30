//file containing helper methods for various animations

import { Dispatch, SetStateAction } from "react";

const typeTextAnimate = function (
  set_text: Dispatch<SetStateAction<string>>,
  message: string, 
  index: number,
  interval: number
  ) { 

    if (index < message.length) {

      set_text(message.slice(0, index++))

      setTimeout(function () { typeTextAnimate(set_text, message, index, interval); }, interval);

    }

  }

  export default typeTextAnimate