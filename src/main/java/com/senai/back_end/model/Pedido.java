package com.senai.back_end.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull; // Adicionada esta importação
import jakarta.validation.constraints.Positive; // Adicionada esta importação
import org.hibernate.validator.constraints.URL; // Adicionada esta importação

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome não pode estar vazio")
    private String nome;

    @NotBlank(message = "Descricao não pode estar vazia")
    private String descricao;

    @NotNull(message = "Preço não pode ser nulo") // Adicionada esta anotação
    @Positive(message = "Preço deve ser um valor positivo") // Adicionada esta anotação
    private Double preco;

    @NotBlank(message = "Categoria não pode estar vazia")
    private String categoria;

    @NotBlank(message = "Disponibilidade não pode estar vazia")
    private String disponibilidade;

    @NotBlank(message = "URL não pode estar vazia")
    @URL(message = "Formato de URL inválido") 

    public Pedido() {
    }

    public Pedido(Long id, String nome, String descricao, Double preco, String categoria, String disponibilidade, String url) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.disponibilidade = disponibilidade;
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDisponibilidade() {
        return disponibilidade;
    }

    public void setDisponibilidade(String disponibilidade) {
        this.disponibilidade = disponibilidade;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}