document.addEventListener('DOMContentLoaded', function() {
    const click_to_convert = document.getElementById('click_to_convert');
    const convert_text = document.getElementById('convert_text');
    let speech = false; // Initialize speech recognition as false
    let recognition;

    // Function to update the button text
    function updateButtonText(isSpeaking) {
        click_to_convert.textContent = isSpeaking ? 'Speaking...' : 'Speak Now!';
    }

    // Check if the SpeechRecognition API is available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // Choose the correct constructor based on browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep the microphone active continuously
        recognition.interimResults = false; // Final results only

        click_to_convert.addEventListener('click', function() {
            if (!speech) {
                // Start voice recognition
                recognition.addEventListener('result', function(e) {
                    const transcript = Array.from(e.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join(' ');

                    convert_text.innerHTML = transcript;
                });

                recognition.start();
                speech = true;
                updateButtonText(true); // Set the button text to 'Speaking'
                console.log('Voice recognition started.');
            } else {
                // Stop voice recognition
                recognition.stop();
                speech = false;
                updateButtonText(false); // Set the button text back to 'Speak Now!'
                console.log('Voice recognition stopped.');
            }
        });
    } else {
        console.log('SpeechRecognition API is not supported in this browser.');
    }
});
