// Form Validation and Submission
document.addEventListener('DOMContentLoaded', () => {
    const consultationForm = document.getElementById('consultationForm');
    
    if(consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation (HTML5 required handles most)
            const phone = document.getElementById('phone').value;
            if(!/^[0-9\-\+]{9,15}$/.test(phone)) {
                alert('Vui lòng nhập số điện thoại hợp lệ!');
                return;
            }
            
            // Simulate form submission
            const btn = consultationForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Đang gửi...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                alert('Đăng ký tư vấn thành công! Đội ngũ VMP Academy sẽ liên hệ với Anh/Chị trong thời gian sớm nhất.');
                consultationForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    }
});
