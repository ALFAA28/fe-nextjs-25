import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
interface CallAPIProps extends AxiosRequestConfig {
  data?: FormData;
  token?: boolean;
  serverToken?: string;
  contentType?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
  contentType,
}: CallAPIProps) {
  let headers = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      try {
        const jwtToken = atob(tokenCookies);
        headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
      } catch (e) {
        // Token tidak valid, lanjut tanpa token
        console.warn('Invalid token format, proceeding without auth');
      }
    }
    // Jika tidak ada token, lanjut tanpa auth (untuk API public)
  }
  const resolvedContentType =
    contentType || (data instanceof FormData ? 'multipart/form-data' : 'application/json');

  console.log('API Call:', { url, method, headers }); // Debug log
  
  const response = await axios({
    url,
    method,
    data,
    headers: {
      ...headers,
      'Content-Type': resolvedContentType,
    },
  }).catch((err) => {
    console.error('API Error:', err); // Debug log
    if (err.response) {
      return err.response;
    }
    return {
      status: 500,
      data: {
        message: err.message || 'Network error',
      },
    };
  });
  
  console.log('API Response Status:', response.status); // Debug log
  console.log('API Response Data:', response.data); // Debug log

  if (!response || response.status > 300) {
    const res = {
      error: true,
      message: response?.data?.message || 'An error occurred',
      data: null,
    };
    return res;
  }

  // Handle response data structure
  if (response.data) {
    // Laravel API typically returns {message: "...", data: [...]}
    // If response.data has a 'data' property, use it
    if (response.data.data !== undefined) {
      const res = {
        error: false,
        message: response.data.message || 'success',
        data: response.data.data,
      };
      console.log('API Response (with data property):', res); // Debug log
      return res;
    }
    // Otherwise, use response.data directly
    const res = {
      error: false,
      message: response.data.message || 'success',
      data: response.data,
    };
    console.log('API Response (direct):', res); // Debug log
    return res;
  }

  console.log('API Response (no data):', response); // Debug log
  return {
    error: false,
    message: 'success',
    data: null,
  };
}
