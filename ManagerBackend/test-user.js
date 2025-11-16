// test-user.js - Fixed version
import fetch from 'node-fetch';

const TEST_EMAIL = 'stone12345@example.com';
const TEST_PASSWORD = 'stone1235';
const TEST_FULL_NAME = 'stone12345'; // Changed from 'name' to 'fullName'

async function runTests() {
    console.log('🚀 Testing Hostel Manager API...\n');

    try {
        // 1. Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await fetch('http://localhost:5000/api/health');
        const healthData = await healthResponse.json();
        console.log('✅ Health:', healthData);

        // 2. Register manager - WITH CORRECT FIELDS
        console.log('\n2. Registering manager...');
        const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: TEST_FULL_NAME,  // Changed from 'name' to 'fullName'
                email: TEST_EMAIL,
                password: TEST_PASSWORD,
                role: 'manager'
            }),
        });

        const registerData = await registerResponse.json();
        console.log('📝 Register Response:', JSON.stringify(registerData, null, 2));
        
        if (registerResponse.ok) {
            console.log('✅ Register: Success');
            
            // 3. Only try login if registration was successful
            console.log('\n3. Logging in...');
            const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: TEST_EMAIL,
                    password: TEST_PASSWORD
                }),
            });

            const loginData = await loginResponse.json();
            console.log('📝 Login Response:', JSON.stringify(loginData, null, 2));
            
            if (loginResponse.ok) {
                console.log('✅ Login: Success');
                const token = loginData.token;
                console.log('🔑 Token received');
                
                // Continue with other tests that need the token...
                
            } else {
                console.log('❌ Login: Failed -', loginData.message);
            }
            
        } else {
            console.log('❌ Register Failed:', registerData.message);
            console.log('💡 Validation errors:', registerData.errors);
        }

    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

runTests();