package com.stackextend.websocketbackendexample.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends AbstractWebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/socket")
				.setAllowedOrigins("*")
				.withSockJS();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.setApplicationDestinationPrefixes("/app")
				.enableSimpleBroker("/chat");
	}
	@Override
	public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
		registration.setMessageSizeLimit(4096 * 4096);
		//registration.setSendTimeLimit(25 * 1000);
		registration.setSendBufferSizeLimit(2048 * 2048);

	}
//	@Override
//	public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
//		stompEndpointRegistry.addEndpoint("/socket")
//				.setAllowedOrigins("*")
//				.withSockJS();
//	}
//
//	@Override
//	public void configureMessageBroker(MessageBrokerRegistry registry) {
//		registry.enableSimpleBroker("/topic");
//		registry.setApplicationDestinationPrefixes("/app");
//	}
}
