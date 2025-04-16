const express = require('express');
const axios = require('axios');
const cors = require('cors');
const router = express.Router();
const solvedacToken = process.env.SOLVEDAC_TOKEN;

router.get('/', async (req, res) => {
    console.log('!--------------- userPage-Get');

    const userName = req.query.userName;
    console.log('userName:', userName);

    const data = {};

    try {
        const zanDataResponse = await axios.get('https://solved.ac/api/v3/user/history?handle=' + userName + '&topic=solvedCount', {
            headers: {
                Cookie: `solvedacToken=${solvedacToken}`
            },
            credentials: 'include',
            withCredentials: true
        });
        data.zanData = zanDataResponse.data

        const tagDataResponse = await axios.get('https://solved.ac/api/v3/user/problem_tag_stats?handle=' + userName, {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.tagData = tagDataResponse.data;

        const userDataResponse = await axios.get('https://solved.ac/api/v3/user/show?handle=' + userName, {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.userData = userDataResponse.data;

        const problemDataResponse = await axios.get('https://solved.ac/api/v3/search/problem?query=solved_by%3A' + userName + '&sort=level&direction=desc', {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.problemData = problemDataResponse.data;

        const tierDataResponse = await axios.get('https://solved.ac/api/v3/user/problem_stats?handle=' + userName, {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.tierData = tierDataResponse.data;

        res.json(data);
    } catch (err) {
        console.error('API 호출 실패:', err.response?.data || err.message);
        res.status(500).json({ error: 'API 서버 연결 실패' });
    }
});

router.post('/', async (req, res) => {

    console.log('!--------------- userPage-Post');

    const userName = req.body;
    console.log('userName:', userName);

    const data = {};

    try {
        const zanDataResponse = await axios.get('https://solved.ac/api/v3/user/history?handle=' + userName + '&topic=solvedCount', {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.zanData = zanDataResponse.data

        const tagDataResponse = await axios.get('https://solved.ac/api/v3/user/problem_tag_stats?handle=' + userName, {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.tagData = tagDataResponse.data;

        const userDataResponse = await axios.get('https://solved.ac/api/v3/user/show?handle=' + userName, {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.userData = userDataResponse.data;

        const problemDataResponse = await axios.get('https://solved.ac/api/v3/search/problem?query=solved_by%3A' + userName + '&sort=level&direction=desc', {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.problemData = problemDataResponse.data;

        const tierDataResponse = await axios.get('https://solved.ac/api/v3/user/problem_stats?handle=' + userName, {
            headers: {
                Cookie: 'solvedacToken=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJxOTkyMjAwMCIsInRva2VuVmVyc2lvbiI6MiwiaWF0IjoxNjg4NDUyMzYwfQ.WhtDZ_KeSPBNGq33gP08XVE_YOLLySGczMModtU1U4M.Yi6WhNs26SuwQ8OlWE8ALsVz52nh%2BFLyrR9GIyYC%2B2Y'
            },
            credentials: 'include',
            withCredentials: true
        });
        data.tierData = tierDataResponse.data;

        res.json(data);
    } catch (err) {
        console.error('API 호출 실패:', err.response?.data || err.message);
        res.status(500).json({ error: 'API 서버 연결 실패' });
    }
});

module.exports = router;
