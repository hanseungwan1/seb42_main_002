package com.mainproject.back.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.HashMap;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;
import org.springframework.web.util.WebUtils;

@Slf4j
@Component
public class RequestFilter<Map> extends GenericFilterBean {

  @Bean
  public FilterRegistrationBean registrationBean(HttpServletRequest httpServletRequest) {
    FilterRegistrationBean registrationBean = new FilterRegistrationBean();
    registrationBean.setFilter(new RequestFilter());
    return registrationBean;
  }


  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(
        (HttpServletRequest) request);
    ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(
        (HttpServletResponse) response);

    long start = System.currentTimeMillis();
    chain.doFilter(requestWrapper, responseWrapper);
    long end = System.currentTimeMillis();

    log.info("\n" +
            "[REQUEST] {} - {} {} - {}\n" +
            "Headers : {}\n" +
            "Request : {}\n" +
            "Response : {}\n",
        ((HttpServletRequest) request).getMethod(),
        ((HttpServletRequest) request).getRequestURI(),
        responseWrapper.getStatus(),
        (end - start) / 1000.0,
        getHeaders((HttpServletRequest) request),
        getRequestBody(requestWrapper),
        getResponseBody(responseWrapper));
  }

  private HashMap getHeaders(HttpServletRequest request) {
    HashMap headerMap = new HashMap<>();

    Enumeration headerArray = request.getHeaderNames();
    while (headerArray.hasMoreElements()) {
      String headerName = (String) headerArray.nextElement();
      headerMap.put(headerName, request.getHeader(headerName));
    }
    return headerMap;
  }

  private String getRequestBody(ContentCachingRequestWrapper request)
      throws UnsupportedEncodingException {
    ContentCachingRequestWrapper wrapper = WebUtils.getNativeRequest(request,
        ContentCachingRequestWrapper.class);
    wrapper.setCharacterEncoding("UTF-8");
    if (wrapper != null) {
      byte[] buf = wrapper.getContentAsByteArray();
      if (buf.length > 0) {
        try {
          String json = new String(buf, 0, buf.length, wrapper.getCharacterEncoding());
          Gson gson = new GsonBuilder().setPrettyPrinting().create();
          JsonElement element = JsonParser.parseString(json);
          return gson.toJson(element);
        } catch (UnsupportedEncodingException e) {
          return " - ";
        }
      }
    }
    return " - ";
  }

  private String getResponseBody(final HttpServletResponse response) throws IOException {
    String payload = null;
    ContentCachingResponseWrapper wrapper =
        WebUtils.getNativeResponse(response, ContentCachingResponseWrapper.class);
    wrapper.setCharacterEncoding("UTF-8");
    if (wrapper != null) {
      byte[] buf = wrapper.getContentAsByteArray();
      if (buf.length > 0) {
        payload = new String(buf, 0, buf.length, wrapper.getCharacterEncoding());
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonElement element = JsonParser.parseString(payload);
        payload = gson.toJson(element);
        wrapper.copyBodyToResponse();
      }
    }
    return null == payload ? " - " : payload;
  }


}
