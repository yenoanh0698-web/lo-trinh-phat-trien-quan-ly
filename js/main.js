// Sticky Nav Highlight on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const stickyNav = document.getElementById('stickyNav');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Sticky nav shadow
        if (window.scrollY > 50) {
            stickyNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            stickyNav.style.boxShadow = 'none';
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // offset for sticky nav
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll to Form Function
function scrollToForm() {
    const formSection = document.querySelector('.register-form-section');
    if (formSection) {
        window.scrollTo({
            top: formSection.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Focus on first input after scroll
        setTimeout(() => {
            document.getElementById('company').focus();
        }, 800);
    }
}


// --- Quiz Logic ---
let currentQuizStep = 1;
const totalQuizSteps = 3;

const RESULT_DATA = {
    'L1_REAL': {
        pathName: 'LỘ TRÌNH PHÁT TRIỂN NĂNG LỰC QUẢN LÝ TOÀN DIỆN',
        title: 'Xây dựng nền tảng quản lý vững chắc',
        desc: 'Anh/Chị nên bắt đầu từ REAL Manager™ để cải thiện năng lực giao việc, trao quyền, giám sát và tổ chức công việc đội ngũ. Đây là nền tảng giúp giảm tình trạng ôm đồm, làm thay và nhân viên phụ thuộc vào chỉ đạo.',
        nextStep: 'Sau khi hoàn thiện nền tảng, Anh/Chị có thể tiếp tục phát triển với UMM và High Performance Management.',
        ctaLink: 'https://vmptraining.com/khoa-hoc-quan-ly-real-manager/',
        highlightId: 'course-L1_REAL'
    },
    'L1_UMM': {
        pathName: 'LỘ TRÌNH PHÁT TRIỂN NĂNG LỰC QUẢN LÝ TOÀN DIỆN',
        title: 'Phát triển năng lực quản lý toàn diện',
        desc: 'Với kinh nghiệm quản lý hiện có, Anh/Chị phù hợp với UMM để phát triển đồng bộ năng lực quản lý bản thân, nhân viên, đội nhóm và sự thay đổi.',
        nextStep: 'Sau UMM, Anh/Chị có thể tiếp tục với High Performance Management để nâng cao hiệu suất đội ngũ.',
        ctaLink: 'https://umm.edu.vn/dao-tao-quan-ly-public/',
        highlightId: 'course-L1_UMM'
    },
    'L1_HPM': {
        pathName: 'LỘ TRÌNH PHÁT TRIỂN NĂNG LỰC QUẢN LÝ TOÀN DIỆN',
        title: 'Nâng cao năng lực quản trị hiệu suất',
        desc: 'Nhu cầu trọng tâm của Anh/Chị là thiết lập mục tiêu, theo dõi, đánh giá và cải thiện hiệu suất đội ngũ. High Performance Management phù hợp để xây dựng hệ thống thực thi và quản trị kết quả rõ ràng hơn.',
        nextStep: 'Tập trung phát triển khả năng quản trị mục tiêu, KPI, tiến độ và hiệu suất nhân viên.',
        ctaLink: 'https://vmptraining.com/high-performance-management-dao-tao-quan-ly-hieu-suat-cao/',
        highlightId: 'course-L1_HPM'
    },
    'L2_TTT': {
        pathName: 'LỘ TRÌNH PHÁT TRIỂN NĂNG LỰC QUẢN LÝ CHUYÊN SÂU',
        title: 'Phát triển năng lực đào tạo nội bộ',
        desc: 'Anh/Chị phù hợp với Train The Trainer 3+ để hệ thống hóa kiến thức chuyên môn, thiết kế nội dung, tổ chức hoạt động và dẫn giảng chuyên nghiệp.',
        nextStep: 'Sau khi phát triển năng lực đào tạo, Coaching Skills for Manager sẽ giúp nâng cao khả năng kèm cặp và phát triển nhân viên.',
        ctaLink: 'https://vmptraining.com/dao-tao/train-the-trainer-3-dao-tao-giang-vien-noi-bo-so-1-dong-nam-a/',
        highlightId: 'course-L2_TTT'
    },
    'L2_COACHING': {
        pathName: 'LỘ TRÌNH PHÁT TRIỂN NĂNG LỰC QUẢN LÝ CHUYÊN SÂU',
        title: 'Phát triển nhân viên bằng coaching',
        desc: 'Anh/Chị phù hợp với Coaching Skills for Manager để nâng cao năng lực lắng nghe, đặt câu hỏi, phản hồi và dẫn dắt nhân viên chủ động nhìn ra vấn đề, đề xuất giải pháp và cam kết hành động.',
        nextStep: 'Tập trung chuyển từ đưa lời khuyên và xử lý thay sang dẫn dắt nhân viên tự chịu trách nhiệm với kết quả.',
        ctaLink: 'https://coachingskills.vn/ky-nang-huan-luyen-kem-cap-nhan-vien/',
        highlightId: 'course-L2_COACHING'
    }
};

function nextQuizStep() {
    const errorMsg = document.getElementById('quiz-error-msg');
    const selectedOption = document.querySelector('input[name="q' + currentQuizStep + '"]:checked');
    
    if (!selectedOption) {
        errorMsg.innerText = 'Vui lòng hoàn thành câu hỏi để tiếp tục.';
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';
    
    document.getElementById('step-' + currentQuizStep).style.display = 'none';
    currentQuizStep++;
    
    if (currentQuizStep <= totalQuizSteps) {
        document.getElementById('step-' + currentQuizStep).style.display = 'block';
    }
    
    if (currentQuizStep === totalQuizSteps) {
        document.getElementById('quiz-next-btn').style.display = 'none';
        document.getElementById('quiz-submit-btn').style.display = 'inline-block';
    }
}

function calculateScores(q1, q2, q3) {
    let p1 = 0;
    let p2 = 0;
    
    // Q1
    if (q1 === 'A1') p1 += 3;
    if (q1 === 'A2') { p1 += 1; p2 += 1; }
    if (q1 === 'A3') { p1 += 1; p2 += 1; }
    
    // Q2
    if (q2 === 'B1') p1 += 4;
    if (q2 === 'B2') p1 += 4;
    if (q2 === 'B3') p2 += 4;
    
    // Q3
    if (q3 === 'C1') p1 += 4;
    if (q3 === 'C2') p2 += 4;
    if (q3 === 'C3') p2 += 4;
    
    return { p1, p2 };
}

function determinePath(p1, p2, q2) {
    if (p1 > p2) return 'PATH_1';
    if (p2 > p1) return 'PATH_2';
    // Tie breaker
    if (q2 === 'B1' || q2 === 'B2') return 'PATH_1';
    if (q2 === 'B3') return 'PATH_2';
    return 'PATH_1'; // fallback
}

function determinePrimaryCourse(path, q1, q2, q3) {
    if (path === 'PATH_1') {
        if (q1 === 'A1') return 'L1_REAL';
        if (q1 !== 'A1' && q2 === 'B2') return 'L1_HPM';
        if (q2 === 'B1' && q1 === 'A2') return 'L1_REAL';
        if (q2 === 'B1' && q1 === 'A3') return 'L1_UMM';
        // Fallbacks
        if (q1 === 'A1') return 'L1_REAL';
        return 'L1_UMM'; 
    } else {
        if (q3 === 'C3') return 'L2_TTT';
        if (q3 === 'C2') return 'L2_COACHING';
        if (q3 === 'C1' && q2 === 'B3') return 'L2_COACHING';
        return 'L2_COACHING'; // fallback
    }
}

function resetQuiz() {
    // Hide Result
    document.getElementById('quiz-result').style.display = 'none';
    
    // Uncheck all radios
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(r => r.checked = false);
    
    // Reset steps
    for(let i=1; i<=totalQuizSteps; i++) {
        const step = document.getElementById('step-' + i);
        if(step) step.style.display = 'none';
    }
    
    // Show step 1
    currentQuizStep = 1;
    document.getElementById('step-1').style.display = 'block';
    
    // Reset buttons
    document.getElementById('quiz-next-btn').style.display = 'inline-block';
    document.getElementById('quiz-submit-btn').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    
    // Scroll back to quiz
    document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function submitQuiz() {
    const errorMsg = document.getElementById('quiz-error-msg');
    const selectedOption = document.querySelector('input[name="q' + currentQuizStep + '"]:checked');
    
    if (!selectedOption) {
        errorMsg.innerText = 'Vui lòng hoàn thành cả 3 câu hỏi để nhận lộ trình phù hợp.';
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';
    
    // Validate all 3 questions answered
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;
    const q3 = document.querySelector('input[name="q3"]:checked')?.value;
    
    if (!q1 || !q2 || !q3) {
        errorMsg.innerText = 'Vui lòng hoàn thành cả 3 câu hỏi để nhận lộ trình phù hợp.';
        errorMsg.style.display = 'block';
        return;
    }
    
    // 1. Calculate logic
    const { p1, p2 } = calculateScores(q1, q2, q3);
    const selectedPath = determinePath(p1, p2, q2);
    const resultCode = determinePrimaryCourse(selectedPath, q1, q2, q3);
    
    // 2. Data for GA/GTM Tracking
    const trackingData = {
        event: 'training_quiz_completed',
        answer_q1: q1,
        answer_q2: q2,
        answer_q3: q3,
        path1_score: p1,
        path2_score: p2,
        selected_path: selectedPath,
        result_code: resultCode,
        primary_course: RESULT_DATA[resultCode].title,
        course_url: RESULT_DATA[resultCode].ctaLink,
        completed_at: new Date().toISOString()
    };
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(trackingData);
    console.log("Tracking Event Pushed:", trackingData);
    
    // 3. Render UI
    const data = RESULT_DATA[resultCode];
    document.getElementById('result-path-name').innerText = data.pathName;
    document.getElementById('result-title').innerText = data.title;
    document.getElementById('result-desc').innerText = data.desc;
    document.getElementById('result-next-step').innerText = data.nextStep;
    document.getElementById('result-cta-btn').href = '#dang-ky';
    
    // Hide/Show paths
    document.getElementById('result-combo-1').style.display = (selectedPath === 'PATH_1') ? 'block' : 'none';
    document.getElementById('result-combo-2').style.display = (selectedPath === 'PATH_2') ? 'block' : 'none';
    
    // Remove all previous highlights
    document.querySelectorAll('.course-highlight').forEach(el => el.classList.remove('course-highlight'));
    
    // Add highlight
    const highlightEl = document.getElementById(data.highlightId);
    if(highlightEl) highlightEl.classList.add('course-highlight');
    
    // View transition
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
}

