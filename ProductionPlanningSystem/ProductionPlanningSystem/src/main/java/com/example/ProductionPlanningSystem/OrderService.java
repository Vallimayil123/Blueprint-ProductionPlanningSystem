package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrder(Long id, Order updatedOrder){

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setCustomerName(updatedOrder.getCustomerName());
        order.setProductCode(updatedOrder.getProductCode());
        order.setQuantity(updatedOrder.getQuantity());
        order.setDeadline(updatedOrder.getDeadline());
        order.setStatus(updatedOrder.getStatus());

        return orderRepository.save(order);
    }

    public void deleteOrder(Long id){
        orderRepository.deleteById(id);
    }
}
