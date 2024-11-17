// import React, { useState } from 'react';

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        userName: '',
        userId: '',        
        password: '',
        checkPassword: '',
    });

    const { userName, userId, password, checkPassword } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 로직 처리
        console.log('회원가입 데이터:', formData);
    };

    return (
        <div className="signUp-container">
            <h2>회원가입 페이지</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="userName">닉네임</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        // value={userName}
                        placeholder="사용하실 이름을 다시 입력해주세요."
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        // value={userId}
                        placeholder="아이디를 다시 입력해주세요."
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // value={password}
                        placeholder="비밀번호를 입력해주세요."
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="checkPassword">비밀번호확인</label>
                    <input
                        type="password"
                        id="checkPassword"
                        name="checkPassword"
                        // value={checkPassword}
                        placeholder="비밀번호를 다시 입력해주세요."
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpPage;
