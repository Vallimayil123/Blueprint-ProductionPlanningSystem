package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping
    public ResponseEntity<ProductModel> addProduct(
            @RequestBody ProductModel product){

        return ResponseEntity.ok(
                productService.addProduct(product));

    }

    @GetMapping
    public ResponseEntity<List<ProductModel>> getProducts(){

        return ResponseEntity.ok(
                productService.getAllProducts());

    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductModel> updateProduct(

            @PathVariable Long id,

            @RequestBody ProductModel product){

        return ResponseEntity.ok(
                productService.updateProduct(id,product));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id){

        productService.deleteProduct(id);

        return ResponseEntity.ok("Deleted Successfully");

    }

}