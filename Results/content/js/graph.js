/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 408.0, "minX": 0.0, "maxY": 2241.0, "series": [{"data": [[0.0, 408.0], [0.1, 408.0], [0.2, 409.0], [0.3, 409.0], [0.4, 409.0], [0.5, 409.0], [0.6, 409.0], [0.7, 410.0], [0.8, 411.0], [0.9, 411.0], [1.0, 414.0], [1.1, 414.0], [1.2, 414.0], [1.3, 414.0], [1.4, 414.0], [1.5, 414.0], [1.6, 414.0], [1.7, 414.0], [1.8, 415.0], [1.9, 415.0], [2.0, 415.0], [2.1, 415.0], [2.2, 415.0], [2.3, 415.0], [2.4, 415.0], [2.5, 415.0], [2.6, 416.0], [2.7, 416.0], [2.8, 416.0], [2.9, 416.0], [3.0, 416.0], [3.1, 416.0], [3.2, 416.0], [3.3, 416.0], [3.4, 416.0], [3.5, 418.0], [3.6, 418.0], [3.7, 420.0], [3.8, 420.0], [3.9, 420.0], [4.0, 420.0], [4.1, 420.0], [4.2, 421.0], [4.3, 421.0], [4.4, 421.0], [4.5, 421.0], [4.6, 421.0], [4.7, 421.0], [4.8, 422.0], [4.9, 422.0], [5.0, 422.0], [5.1, 422.0], [5.2, 422.0], [5.3, 422.0], [5.4, 423.0], [5.5, 423.0], [5.6, 423.0], [5.7, 423.0], [5.8, 423.0], [5.9, 423.0], [6.0, 423.0], [6.1, 423.0], [6.2, 425.0], [6.3, 425.0], [6.4, 425.0], [6.5, 425.0], [6.6, 425.0], [6.7, 425.0], [6.8, 425.0], [6.9, 425.0], [7.0, 426.0], [7.1, 426.0], [7.2, 426.0], [7.3, 426.0], [7.4, 426.0], [7.5, 426.0], [7.6, 426.0], [7.7, 426.0], [7.8, 426.0], [7.9, 426.0], [8.0, 427.0], [8.1, 427.0], [8.2, 427.0], [8.3, 427.0], [8.4, 427.0], [8.5, 427.0], [8.6, 427.0], [8.7, 427.0], [8.8, 427.0], [8.9, 427.0], [9.0, 427.0], [9.1, 427.0], [9.2, 427.0], [9.3, 427.0], [9.4, 427.0], [9.5, 427.0], [9.6, 427.0], [9.7, 427.0], [9.8, 428.0], [9.9, 428.0], [10.0, 428.0], [10.1, 428.0], [10.2, 428.0], [10.3, 428.0], [10.4, 428.0], [10.5, 428.0], [10.6, 429.0], [10.7, 429.0], [10.8, 429.0], [10.9, 429.0], [11.0, 429.0], [11.1, 429.0], [11.2, 429.0], [11.3, 429.0], [11.4, 429.0], [11.5, 429.0], [11.6, 429.0], [11.7, 429.0], [11.8, 430.0], [11.9, 430.0], [12.0, 430.0], [12.1, 430.0], [12.2, 430.0], [12.3, 430.0], [12.4, 430.0], [12.5, 430.0], [12.6, 430.0], [12.7, 430.0], [12.8, 431.0], [12.9, 431.0], [13.0, 431.0], [13.1, 431.0], [13.2, 431.0], [13.3, 431.0], [13.4, 431.0], [13.5, 431.0], [13.6, 431.0], [13.7, 431.0], [13.8, 431.0], [13.9, 431.0], [14.0, 431.0], [14.1, 431.0], [14.2, 432.0], [14.3, 432.0], [14.4, 432.0], [14.5, 432.0], [14.6, 432.0], [14.7, 432.0], [14.8, 432.0], [14.9, 432.0], [15.0, 432.0], [15.1, 432.0], [15.2, 432.0], [15.3, 432.0], [15.4, 433.0], [15.5, 433.0], [15.6, 433.0], [15.7, 433.0], [15.8, 433.0], [15.9, 433.0], [16.0, 433.0], [16.1, 433.0], [16.2, 434.0], [16.3, 434.0], [16.4, 434.0], [16.5, 434.0], [16.6, 434.0], [16.7, 434.0], [16.8, 434.0], [16.9, 434.0], [17.0, 434.0], [17.1, 434.0], [17.2, 434.0], [17.3, 434.0], [17.4, 435.0], [17.5, 435.0], [17.6, 435.0], [17.7, 435.0], [17.8, 435.0], [17.9, 435.0], [18.0, 435.0], [18.1, 435.0], [18.2, 435.0], [18.3, 435.0], [18.4, 435.0], [18.5, 435.0], [18.6, 435.0], [18.7, 435.0], [18.8, 436.0], [18.9, 436.0], [19.0, 436.0], [19.1, 436.0], [19.2, 436.0], [19.3, 436.0], [19.4, 436.0], [19.5, 436.0], [19.6, 436.0], [19.7, 436.0], [19.8, 436.0], [19.9, 436.0], [20.0, 436.0], [20.1, 436.0], [20.2, 436.0], [20.3, 436.0], [20.4, 436.0], [20.5, 436.0], [20.6, 436.0], [20.7, 436.0], [20.8, 436.0], [20.9, 436.0], [21.0, 437.0], [21.1, 437.0], [21.2, 437.0], [21.3, 437.0], [21.4, 437.0], [21.5, 437.0], [21.6, 437.0], [21.7, 437.0], [21.8, 437.0], [21.9, 437.0], [22.0, 437.0], [22.1, 437.0], [22.2, 437.0], [22.3, 437.0], [22.4, 437.0], [22.5, 437.0], [22.6, 437.0], [22.7, 437.0], [22.8, 437.0], [22.9, 437.0], [23.0, 438.0], [23.1, 438.0], [23.2, 438.0], [23.3, 438.0], [23.4, 439.0], [23.5, 439.0], [23.6, 439.0], [23.7, 439.0], [23.8, 439.0], [23.9, 439.0], [24.0, 439.0], [24.1, 439.0], [24.2, 439.0], [24.3, 439.0], [24.4, 439.0], [24.5, 439.0], [24.6, 440.0], [24.7, 440.0], [24.8, 441.0], [24.9, 441.0], [25.0, 441.0], [25.1, 441.0], [25.2, 441.0], [25.3, 441.0], [25.4, 441.0], [25.5, 441.0], [25.6, 441.0], [25.7, 441.0], [25.8, 441.0], [25.9, 441.0], [26.0, 442.0], [26.1, 442.0], [26.2, 442.0], [26.3, 442.0], [26.4, 442.0], [26.5, 442.0], [26.6, 442.0], [26.7, 442.0], [26.8, 442.0], [26.9, 442.0], [27.0, 442.0], [27.1, 442.0], [27.2, 442.0], [27.3, 442.0], [27.4, 442.0], [27.5, 442.0], [27.6, 442.0], [27.7, 442.0], [27.8, 442.0], [27.9, 442.0], [28.0, 442.0], [28.1, 442.0], [28.2, 442.0], [28.3, 442.0], [28.4, 442.0], [28.5, 442.0], [28.6, 442.0], [28.7, 442.0], [28.8, 442.0], [28.9, 442.0], [29.0, 443.0], [29.1, 443.0], [29.2, 443.0], [29.3, 443.0], [29.4, 443.0], [29.5, 443.0], [29.6, 443.0], [29.7, 443.0], [29.8, 443.0], [29.9, 443.0], [30.0, 443.0], [30.1, 443.0], [30.2, 443.0], [30.3, 443.0], [30.4, 443.0], [30.5, 443.0], [30.6, 444.0], [30.7, 444.0], [30.8, 444.0], [30.9, 444.0], [31.0, 444.0], [31.1, 444.0], [31.2, 444.0], [31.3, 444.0], [31.4, 444.0], [31.5, 444.0], [31.6, 444.0], [31.7, 444.0], [31.8, 444.0], [31.9, 444.0], [32.0, 444.0], [32.1, 444.0], [32.2, 444.0], [32.3, 444.0], [32.4, 444.0], [32.5, 444.0], [32.6, 444.0], [32.7, 444.0], [32.8, 444.0], [32.9, 444.0], [33.0, 445.0], [33.1, 445.0], [33.2, 445.0], [33.3, 445.0], [33.4, 445.0], [33.5, 445.0], [33.6, 445.0], [33.7, 445.0], [33.8, 445.0], [33.9, 445.0], [34.0, 445.0], [34.1, 445.0], [34.2, 445.0], [34.3, 445.0], [34.4, 446.0], [34.5, 446.0], [34.6, 446.0], [34.7, 446.0], [34.8, 446.0], [34.9, 446.0], [35.0, 446.0], [35.1, 446.0], [35.2, 446.0], [35.3, 446.0], [35.4, 447.0], [35.5, 447.0], [35.6, 447.0], [35.7, 447.0], [35.8, 447.0], [35.9, 447.0], [36.0, 447.0], [36.1, 447.0], [36.2, 447.0], [36.3, 447.0], [36.4, 447.0], [36.5, 447.0], [36.6, 447.0], [36.7, 447.0], [36.8, 448.0], [36.9, 448.0], [37.0, 448.0], [37.1, 448.0], [37.2, 448.0], [37.3, 448.0], [37.4, 448.0], [37.5, 448.0], [37.6, 449.0], [37.7, 449.0], [37.8, 449.0], [37.9, 449.0], [38.0, 449.0], [38.1, 449.0], [38.2, 449.0], [38.3, 449.0], [38.4, 449.0], [38.5, 449.0], [38.6, 450.0], [38.7, 450.0], [38.8, 450.0], [38.9, 450.0], [39.0, 450.0], [39.1, 450.0], [39.2, 451.0], [39.3, 451.0], [39.4, 451.0], [39.5, 451.0], [39.6, 451.0], [39.7, 451.0], [39.8, 451.0], [39.9, 451.0], [40.0, 452.0], [40.1, 452.0], [40.2, 452.0], [40.3, 452.0], [40.4, 452.0], [40.5, 452.0], [40.6, 452.0], [40.7, 452.0], [40.8, 452.0], [40.9, 452.0], [41.0, 453.0], [41.1, 453.0], [41.2, 453.0], [41.3, 453.0], [41.4, 453.0], [41.5, 453.0], [41.6, 453.0], [41.7, 453.0], [41.8, 454.0], [41.9, 454.0], [42.0, 454.0], [42.1, 454.0], [42.2, 454.0], [42.3, 454.0], [42.4, 454.0], [42.5, 454.0], [42.6, 455.0], [42.7, 455.0], [42.8, 455.0], [42.9, 455.0], [43.0, 455.0], [43.1, 455.0], [43.2, 455.0], [43.3, 455.0], [43.4, 455.0], [43.5, 455.0], [43.6, 456.0], [43.7, 456.0], [43.8, 456.0], [43.9, 456.0], [44.0, 456.0], [44.1, 456.0], [44.2, 456.0], [44.3, 456.0], [44.4, 456.0], [44.5, 456.0], [44.6, 456.0], [44.7, 456.0], [44.8, 456.0], [44.9, 456.0], [45.0, 456.0], [45.1, 456.0], [45.2, 457.0], [45.3, 457.0], [45.4, 457.0], [45.5, 457.0], [45.6, 457.0], [45.7, 457.0], [45.8, 457.0], [45.9, 457.0], [46.0, 457.0], [46.1, 457.0], [46.2, 457.0], [46.3, 457.0], [46.4, 457.0], [46.5, 457.0], [46.6, 457.0], [46.7, 457.0], [46.8, 458.0], [46.9, 458.0], [47.0, 458.0], [47.1, 458.0], [47.2, 458.0], [47.3, 458.0], [47.4, 458.0], [47.5, 458.0], [47.6, 459.0], [47.7, 459.0], [47.8, 459.0], [47.9, 459.0], [48.0, 459.0], [48.1, 459.0], [48.2, 459.0], [48.3, 459.0], [48.4, 459.0], [48.5, 459.0], [48.6, 459.0], [48.7, 459.0], [48.8, 460.0], [48.9, 460.0], [49.0, 460.0], [49.1, 460.0], [49.2, 461.0], [49.3, 461.0], [49.4, 461.0], [49.5, 461.0], [49.6, 461.0], [49.7, 461.0], [49.8, 461.0], [49.9, 461.0], [50.0, 461.0], [50.1, 461.0], [50.2, 462.0], [50.3, 462.0], [50.4, 462.0], [50.5, 462.0], [50.6, 462.0], [50.7, 462.0], [50.8, 462.0], [50.9, 462.0], [51.0, 462.0], [51.1, 462.0], [51.2, 463.0], [51.3, 463.0], [51.4, 463.0], [51.5, 463.0], [51.6, 463.0], [51.7, 463.0], [51.8, 463.0], [51.9, 463.0], [52.0, 463.0], [52.1, 463.0], [52.2, 463.0], [52.3, 463.0], [52.4, 463.0], [52.5, 463.0], [52.6, 464.0], [52.7, 464.0], [52.8, 464.0], [52.9, 464.0], [53.0, 464.0], [53.1, 464.0], [53.2, 464.0], [53.3, 464.0], [53.4, 464.0], [53.5, 464.0], [53.6, 464.0], [53.7, 464.0], [53.8, 465.0], [53.9, 465.0], [54.0, 465.0], [54.1, 465.0], [54.2, 465.0], [54.3, 465.0], [54.4, 465.0], [54.5, 465.0], [54.6, 465.0], [54.7, 465.0], [54.8, 466.0], [54.9, 466.0], [55.0, 466.0], [55.1, 466.0], [55.2, 466.0], [55.3, 466.0], [55.4, 466.0], [55.5, 466.0], [55.6, 467.0], [55.7, 467.0], [55.8, 467.0], [55.9, 467.0], [56.0, 467.0], [56.1, 467.0], [56.2, 468.0], [56.3, 468.0], [56.4, 468.0], [56.5, 468.0], [56.6, 468.0], [56.7, 468.0], [56.8, 468.0], [56.9, 468.0], [57.0, 468.0], [57.1, 468.0], [57.2, 469.0], [57.3, 469.0], [57.4, 469.0], [57.5, 469.0], [57.6, 470.0], [57.7, 470.0], [57.8, 470.0], [57.9, 470.0], [58.0, 470.0], [58.1, 470.0], [58.2, 470.0], [58.3, 470.0], [58.4, 470.0], [58.5, 470.0], [58.6, 470.0], [58.7, 470.0], [58.8, 471.0], [58.9, 471.0], [59.0, 471.0], [59.1, 471.0], [59.2, 471.0], [59.3, 471.0], [59.4, 471.0], [59.5, 471.0], [59.6, 472.0], [59.7, 472.0], [59.8, 472.0], [59.9, 472.0], [60.0, 472.0], [60.1, 472.0], [60.2, 473.0], [60.3, 473.0], [60.4, 473.0], [60.5, 473.0], [60.6, 473.0], [60.7, 473.0], [60.8, 473.0], [60.9, 473.0], [61.0, 473.0], [61.1, 473.0], [61.2, 473.0], [61.3, 473.0], [61.4, 474.0], [61.5, 474.0], [61.6, 474.0], [61.7, 474.0], [61.8, 474.0], [61.9, 474.0], [62.0, 474.0], [62.1, 474.0], [62.2, 475.0], [62.3, 475.0], [62.4, 475.0], [62.5, 475.0], [62.6, 475.0], [62.7, 475.0], [62.8, 475.0], [62.9, 475.0], [63.0, 476.0], [63.1, 476.0], [63.2, 476.0], [63.3, 476.0], [63.4, 476.0], [63.5, 476.0], [63.6, 476.0], [63.7, 476.0], [63.8, 476.0], [63.9, 476.0], [64.0, 476.0], [64.1, 476.0], [64.2, 476.0], [64.3, 476.0], [64.4, 477.0], [64.5, 477.0], [64.6, 477.0], [64.7, 477.0], [64.8, 477.0], [64.9, 477.0], [65.0, 477.0], [65.1, 477.0], [65.2, 477.0], [65.3, 477.0], [65.4, 477.0], [65.5, 477.0], [65.6, 478.0], [65.7, 478.0], [65.8, 478.0], [65.9, 478.0], [66.0, 478.0], [66.1, 478.0], [66.2, 478.0], [66.3, 478.0], [66.4, 479.0], [66.5, 479.0], [66.6, 479.0], [66.7, 479.0], [66.8, 479.0], [66.9, 479.0], [67.0, 481.0], [67.1, 481.0], [67.2, 481.0], [67.3, 481.0], [67.4, 481.0], [67.5, 481.0], [67.6, 482.0], [67.7, 482.0], [67.8, 482.0], [67.9, 482.0], [68.0, 482.0], [68.1, 482.0], [68.2, 482.0], [68.3, 482.0], [68.4, 483.0], [68.5, 483.0], [68.6, 483.0], [68.7, 483.0], [68.8, 483.0], [68.9, 483.0], [69.0, 483.0], [69.1, 483.0], [69.2, 483.0], [69.3, 483.0], [69.4, 483.0], [69.5, 483.0], [69.6, 483.0], [69.7, 483.0], [69.8, 484.0], [69.9, 484.0], [70.0, 485.0], [70.1, 485.0], [70.2, 485.0], [70.3, 485.0], [70.4, 485.0], [70.5, 485.0], [70.6, 485.0], [70.7, 485.0], [70.8, 486.0], [70.9, 486.0], [71.0, 486.0], [71.1, 486.0], [71.2, 487.0], [71.3, 487.0], [71.4, 488.0], [71.5, 488.0], [71.6, 488.0], [71.7, 488.0], [71.8, 489.0], [71.9, 489.0], [72.0, 489.0], [72.1, 489.0], [72.2, 489.0], [72.3, 489.0], [72.4, 489.0], [72.5, 489.0], [72.6, 489.0], [72.7, 489.0], [72.8, 489.0], [72.9, 489.0], [73.0, 490.0], [73.1, 490.0], [73.2, 490.0], [73.3, 490.0], [73.4, 490.0], [73.5, 490.0], [73.6, 490.0], [73.7, 490.0], [73.8, 491.0], [73.9, 491.0], [74.0, 491.0], [74.1, 491.0], [74.2, 491.0], [74.3, 491.0], [74.4, 491.0], [74.5, 491.0], [74.6, 491.0], [74.7, 491.0], [74.8, 491.0], [74.9, 491.0], [75.0, 493.0], [75.1, 493.0], [75.2, 494.0], [75.3, 494.0], [75.4, 495.0], [75.5, 495.0], [75.6, 495.0], [75.7, 495.0], [75.8, 495.0], [75.9, 495.0], [76.0, 495.0], [76.1, 495.0], [76.2, 496.0], [76.3, 496.0], [76.4, 496.0], [76.5, 496.0], [76.6, 496.0], [76.7, 496.0], [76.8, 497.0], [76.9, 497.0], [77.0, 497.0], [77.1, 497.0], [77.2, 497.0], [77.3, 497.0], [77.4, 497.0], [77.5, 497.0], [77.6, 498.0], [77.7, 498.0], [77.8, 498.0], [77.9, 498.0], [78.0, 500.0], [78.1, 500.0], [78.2, 505.0], [78.3, 505.0], [78.4, 505.0], [78.5, 505.0], [78.6, 505.0], [78.7, 505.0], [78.8, 506.0], [78.9, 506.0], [79.0, 507.0], [79.1, 507.0], [79.2, 507.0], [79.3, 507.0], [79.4, 508.0], [79.5, 508.0], [79.6, 508.0], [79.7, 508.0], [79.8, 508.0], [79.9, 508.0], [80.0, 509.0], [80.1, 509.0], [80.2, 509.0], [80.3, 509.0], [80.4, 510.0], [80.5, 510.0], [80.6, 511.0], [80.7, 511.0], [80.8, 512.0], [80.9, 512.0], [81.0, 512.0], [81.1, 512.0], [81.2, 514.0], [81.3, 514.0], [81.4, 515.0], [81.5, 515.0], [81.6, 515.0], [81.7, 515.0], [81.8, 515.0], [81.9, 516.0], [82.0, 516.0], [82.1, 517.0], [82.2, 517.0], [82.3, 518.0], [82.4, 518.0], [82.5, 519.0], [82.6, 519.0], [82.7, 519.0], [82.8, 519.0], [82.9, 519.0], [83.0, 519.0], [83.1, 519.0], [83.2, 519.0], [83.3, 520.0], [83.4, 520.0], [83.5, 520.0], [83.6, 520.0], [83.7, 521.0], [83.8, 521.0], [83.9, 522.0], [84.0, 522.0], [84.1, 522.0], [84.2, 522.0], [84.3, 522.0], [84.4, 522.0], [84.5, 523.0], [84.6, 523.0], [84.7, 523.0], [84.8, 523.0], [84.9, 523.0], [85.0, 523.0], [85.1, 525.0], [85.2, 525.0], [85.3, 527.0], [85.4, 527.0], [85.5, 527.0], [85.6, 527.0], [85.7, 527.0], [85.8, 527.0], [85.9, 527.0], [86.0, 527.0], [86.1, 527.0], [86.2, 527.0], [86.3, 528.0], [86.4, 528.0], [86.5, 530.0], [86.6, 530.0], [86.7, 530.0], [86.8, 530.0], [86.9, 531.0], [87.0, 531.0], [87.1, 531.0], [87.2, 531.0], [87.3, 532.0], [87.4, 532.0], [87.5, 532.0], [87.6, 532.0], [87.7, 533.0], [87.8, 533.0], [87.9, 534.0], [88.0, 534.0], [88.1, 534.0], [88.2, 534.0], [88.3, 534.0], [88.4, 534.0], [88.5, 534.0], [88.6, 534.0], [88.7, 535.0], [88.8, 535.0], [88.9, 536.0], [89.0, 536.0], [89.1, 538.0], [89.2, 538.0], [89.3, 539.0], [89.4, 539.0], [89.5, 542.0], [89.6, 542.0], [89.7, 544.0], [89.8, 544.0], [89.9, 544.0], [90.0, 544.0], [90.1, 549.0], [90.2, 549.0], [90.3, 550.0], [90.4, 550.0], [90.5, 551.0], [90.6, 551.0], [90.7, 552.0], [90.8, 552.0], [90.9, 554.0], [91.0, 554.0], [91.1, 556.0], [91.2, 556.0], [91.3, 556.0], [91.4, 556.0], [91.5, 562.0], [91.6, 562.0], [91.7, 562.0], [91.8, 562.0], [91.9, 565.0], [92.0, 565.0], [92.1, 565.0], [92.2, 565.0], [92.3, 567.0], [92.4, 567.0], [92.5, 567.0], [92.6, 567.0], [92.7, 568.0], [92.8, 568.0], [92.9, 569.0], [93.0, 569.0], [93.1, 570.0], [93.2, 570.0], [93.3, 571.0], [93.4, 571.0], [93.5, 572.0], [93.6, 572.0], [93.7, 573.0], [93.8, 573.0], [93.9, 575.0], [94.0, 575.0], [94.1, 576.0], [94.2, 576.0], [94.3, 577.0], [94.4, 577.0], [94.5, 582.0], [94.6, 582.0], [94.7, 586.0], [94.8, 586.0], [94.9, 587.0], [95.0, 587.0], [95.1, 587.0], [95.2, 587.0], [95.3, 588.0], [95.4, 588.0], [95.5, 593.0], [95.6, 593.0], [95.7, 605.0], [95.8, 605.0], [95.9, 616.0], [96.0, 616.0], [96.1, 621.0], [96.2, 621.0], [96.3, 652.0], [96.4, 652.0], [96.5, 654.0], [96.6, 654.0], [96.7, 724.0], [96.8, 724.0], [96.9, 989.0], [97.0, 989.0], [97.1, 1198.0], [97.2, 1198.0], [97.3, 1226.0], [97.4, 1226.0], [97.5, 1250.0], [97.6, 1250.0], [97.7, 1287.0], [97.8, 1287.0], [97.9, 1288.0], [98.0, 1288.0], [98.1, 1295.0], [98.2, 1295.0], [98.3, 1333.0], [98.4, 1333.0], [98.5, 1457.0], [98.6, 1457.0], [98.7, 1470.0], [98.8, 1470.0], [98.9, 1514.0], [99.0, 1514.0], [99.1, 1581.0], [99.2, 1581.0], [99.3, 1581.0], [99.4, 1581.0], [99.5, 1605.0], [99.6, 1605.0], [99.7, 1663.0], [99.8, 1663.0], [99.9, 2241.0], [100.0, 2241.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 400.0, "maxY": 390.0, "series": [{"data": [[2200.0, 1.0], [1100.0, 1.0], [1200.0, 5.0], [600.0, 5.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 2.0], [1500.0, 3.0], [400.0, 390.0], [1600.0, 2.0], [900.0, 1.0], [500.0, 88.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 391.0, "series": [{"data": [[0.0, 391.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 103.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 6.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.3856209150326797, "minX": 1.55981682E12, "maxY": 2.851851851851852, "series": [{"data": [[1.55981682E12, 2.851851851851852], [1.55981688E12, 2.583617747440273], [1.55981694E12, 2.3856209150326797]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.55981694E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 480.14285714285717, "minX": 1.0, "maxY": 506.1106719367587, "series": [{"data": [[2.0, 497.6666666666668], [4.0, 480.14285714285717], [1.0, 495.2], [3.0, 506.1106719367587]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[2.5519999999999996, 501.42400000000004]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 4.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 114.3, "minX": 1.55981682E12, "maxY": 825.2833333333333, "series": [{"data": [[1.55981682E12, 152.1], [1.55981688E12, 825.2833333333333], [1.55981694E12, 430.95]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.55981682E12, 114.3], [1.55981688E12, 620.1833333333333], [1.55981694E12, 323.85]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.55981694E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 477.2614379084967, "minX": 1.55981682E12, "maxY": 550.1666666666665, "series": [{"data": [[1.55981682E12, 550.1666666666665], [1.55981688E12, 505.0580204778159], [1.55981694E12, 477.2614379084967]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.55981694E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 477.2352941176473, "minX": 1.55981682E12, "maxY": 550.1296296296294, "series": [{"data": [[1.55981682E12, 550.1296296296294], [1.55981688E12, 505.0204778157001], [1.55981694E12, 477.2352941176473]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.55981694E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.6245733788395906, "minX": 1.55981682E12, "maxY": 1.037037037037037, "series": [{"data": [[1.55981682E12, 1.037037037037037], [1.55981688E12, 0.6245733788395906], [1.55981694E12, 0.6405228758169932]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.55981694E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 408.0, "minX": 1.55981682E12, "maxY": 2241.0, "series": [{"data": [[1.55981682E12, 2241.0], [1.55981688E12, 1663.0], [1.55981694E12, 1581.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.55981682E12, 427.0], [1.55981688E12, 409.0], [1.55981694E12, 408.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.55981682E12, 637.5], [1.55981688E12, 559.6000000000001], [1.55981694E12, 521.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.55981682E12, 2241.0], [1.55981688E12, 1582.44], [1.55981694E12, 1447.080000000002]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.55981682E12, 1289.0], [1.55981688E12, 587.3], [1.55981694E12, 545.8]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.55981694E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 445.0, "minX": 1.0, "maxY": 512.0, "series": [{"data": [[2.0, 505.0], [4.0, 461.0], [1.0, 512.0], [5.0, 467.5], [6.0, 457.0], [3.0, 469.5], [7.0, 445.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 7.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 445.0, "minX": 1.0, "maxY": 512.0, "series": [{"data": [[2.0, 505.0], [4.0, 461.0], [1.0, 512.0], [5.0, 467.0], [6.0, 457.0], [3.0, 469.5], [7.0, 445.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 7.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.95, "minX": 1.55981682E12, "maxY": 4.866666666666666, "series": [{"data": [[1.55981682E12, 0.95], [1.55981688E12, 4.866666666666666], [1.55981694E12, 2.5166666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.55981694E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.9, "minX": 1.55981682E12, "maxY": 4.883333333333334, "series": [{"data": [[1.55981682E12, 0.9], [1.55981688E12, 4.883333333333334], [1.55981694E12, 2.55]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.55981694E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.9, "minX": 1.55981682E12, "maxY": 4.883333333333334, "series": [{"data": [[1.55981682E12, 0.9], [1.55981688E12, 4.883333333333334], [1.55981694E12, 2.55]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.55981694E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.9, "minX": 1.55981682E12, "maxY": 4.883333333333334, "series": [{"data": [[1.55981682E12, 0.9], [1.55981688E12, 4.883333333333334], [1.55981694E12, 2.55]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.55981694E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

