// Quiz Logic
function nextQuizStep(step) {
    // Hide all steps
    document.querySelectorAll('.quiz-step').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    
    // Show target step
    const targetEl = document.getElementById('step' + step);
    if(targetEl) {
        targetEl.style.display = 'block';
        setTimeout(() => targetEl.classList.add('active'), 50);
    }
}

function showQuizResult() {
    // Basic logic based on Q1
    const q1Value = document.querySelector('input[name="q1"]:checked')?.value;
    const resultText = document.getElementById('quizResultText');
    
    if (q1Value === 'senior' || q1Value === 'mid') {
        resultText.innerText = 'LỘ TRÌNH 2: NÂNG CAO (TTT & COACHING)';
        resultText.style.color = 'var(--combo2-color)';
    } else {
        resultText.innerText = 'LỘ TRÌNH 1: PHÁT TRIỂN QUẢN LÝ (REAL, UMM, HP)';
        resultText.style.color = 'var(--combo1-color)';
    }
    
    // Show result
    document.querySelectorAll('.quiz-step').forEach(el => {
        el.style.display = 'none';
    });
    
    const targetEl = document.getElementById('stepResult');
    targetEl.style.display = 'block';
    
    // Auto-select dropdown in form based on result
    const formSelect = document.getElementById('lo_trinh');
    if (formSelect) {
        if (q1Value === 'senior' || q1Value === 'mid') {
            formSelect.value = '2';
        } else {
            formSelect.value = '1';
        }
    }
}

function resetQuiz() {
    // Uncheck all radios
    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.checked = false;
    });
    
    // Go to step 1
    nextQuizStep(1);
}
