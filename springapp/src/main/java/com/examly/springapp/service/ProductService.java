package com.examly.springapp.service;

import java.io.IOException;
import java.util.List;


import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.DTO.ProductDTO;
import com.examly.springapp.model.Product;


public interface ProductService {

    public Product addProduct(Product product,MultipartFile imageFile) throws IOException;
    public List<ProductDTO> getAllProducts();
    public ProductDTO getProductById(long id);
    public List<ProductDTO> getProductsByUserId(long userId);
    public List<ProductDTO> getProductsByCategory(String category);
    public void deleteProduct(long id);
    public Product updateProduct(long productId, Product product,MultipartFile imageFile)  throws IOException;
    public Product updateStock(long productId, Product product);
   


}
