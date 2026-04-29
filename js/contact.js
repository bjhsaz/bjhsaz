// 联系表单处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // 表单提交处理
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 验证所有字段
            let isValid = true;
            const formFields = contactForm.querySelectorAll('input[required], textarea[required]');
            
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // 收集表单数据
                const formData = {
                    name: contactForm.name.value,
                    email: contactForm.email.value,
                    company: contactForm.company.value,
                    service: contactForm.service.value,
                    message: contactForm.message.value
                };
                
                // 显示加载状态
                formMessage.style.display = 'block';
                formMessage.className = 'form-message';
                formMessage.textContent = 'Sending your message...';
                
                // 模拟表单提交（实际项目中应替换为真实的API调用）
                setTimeout(() => {
                    // 这里应该是实际的表单提交逻辑
                    console.log('Form submitted:', formData);
                    
                    // 显示成功消息
                    formMessage.style.display = 'block';
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    
                    // 重置表单
                    contactForm.reset();
                    
                    // 5秒后隐藏消息
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                    
                }, 1500); // 模拟网络延迟
            } else {
                // 显示错误消息
                formMessage.style.display = 'block';
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all required fields correctly.';
                
                // 5秒后隐藏消息
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // 验证单个字段
    function validateField(field) {
        let isValid = true;
        let errorMessage = '';
        
        // 清除之前的错误状态
        field.classList.remove('error');
        field.removeAttribute('data-error');
        
        // 根据字段类型进行验证
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.hasAttribute('required') && field.value.trim() === '') {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // 添加错误状态
        if (!isValid) {
            field.classList.add('error');
            field.setAttribute('data-error', errorMessage);
            
            // 创建或更新错误消息元素
            let errorElement = field.parentNode.querySelector('.field-error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
            errorElement.style.color = '#dc3545';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
        } else {
            // 移除错误消息元素
            const errorElement = field.parentNode.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        }
        
        return isValid;
    }

    // 实时验证
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') || this.type === 'email') {
                validateField(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // 电话号码格式化（如果添加了电话字段）
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 7) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
                }
            }
            e.target.value = value;
        });
    }

    // 表单字段焦点效果
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });

    // 成功动画
    function showSuccessAnimation() {
        const successIcon = document.createElement('div');
        successIcon.className = 'success-animation';
        successIcon.innerHTML = `
            <div class="success-circle"></div>
            <div class="success-check"></div>
        `;
        contactForm.appendChild(successIcon);
        
        // 动画结束后移除
        setTimeout(() => {
            successIcon.remove();
        }, 3000);
    }
});