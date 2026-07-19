package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductModel addProduct(ProductModel product) {

        if(productRepository.findByCode(product.getCode()).isPresent()){

            throw new RuntimeException("Product Code Already Exists");

        }

        return productRepository.save(product);
    }

    public List<ProductModel> getAllProducts(){

        return productRepository.findAll();

    }

    public ProductModel updateProduct(Long id, ProductModel updatedProduct){

        ProductModel product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Product Not Found"));

        product.setName(updatedProduct.getName());
        product.setCode(updatedProduct.getCode());
        product.setPrice(updatedProduct.getPrice());
        product.setProductionTime(updatedProduct.getProductionTime());

        return productRepository.save(product);

    }

    public void deleteProduct(Long id){

        productRepository.deleteById(id);

    }

}